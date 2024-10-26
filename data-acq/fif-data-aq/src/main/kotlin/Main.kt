package pw.valaria

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.pool.HikariPool
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import java.io.File
import java.util.*
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Executors
import java.util.concurrent.ThreadPoolExecutor
import java.util.concurrent.atomic.AtomicInteger
import kotlin.collections.HashMap
import kotlin.io.path.Path
import kotlin.io.path.exists
import kotlin.io.path.isDirectory

fun main() {
    println("Hello World!")

    val json = Json {
        ignoreUnknownKeys = true
    }

    val appConfig: Configuration = json.decodeFromString(File("config.json").readText())

    val places = HashMap<String, PlaceData>()

    val config = HikariConfig()
    config.jdbcUrl = appConfig.jdbc.url
    config.username = appConfig.jdbc.user
    config.password = appConfig.jdbc.password

    config.maximumPoolSize = 10
    val pool = HikariPool(config);

    pool.connection.use { conn ->
        {
            conn.createStatement().use { stmt ->
                {
                    stmt.executeQuery("SELECT * FROM 1").use { rs ->
                        {
                            while (rs.next()) {
                                println(rs)
                            }
                        }
                    }
                }
            }
        }
    }


    val inputFolder = Path("input");
    if (!inputFolder.exists() || !inputFolder.isDirectory()) {
        println("Input folder not found")
        return
    }


    val files = inputFolder.toFile().listFiles()

    // Weird FS state?..
    if (files == null) {
        println("No files found")
        return
    }

    files.forEach { file: File? ->
        run {
            if (file != null && file.isFile && file.name.endsWith(".json")) {
                val placeData = json.decodeFromString<APIResponse>(file.readText())
                placeData.data.forEach { place: PlaceData ->
                    run {
                        places[place.businessId] = place
                    }
                }
            }
        }
    }

    val work = ArrayList<CompletableFuture<Void>>()
    val fin = AtomicInteger(0)
    val execPool = Executors.newFixedThreadPool(2);

    val cities = HashSet<String>()

    places.forEach {
        run {

            pool.connection.use { conn ->
                try {
                    conn.prepareStatement("INSERT INTO biz_cities(name, country) VALUES (?, ?) ON CONFLICT DO NOTHING").use { stmt ->
                        stmt.setString(1, it.value.city)
                        stmt.setString(2, it.value.country)
                        stmt.executeUpdate()
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }

    places.forEach {
        run {
            val future = CompletableFuture.runAsync(object : Runnable {
                override fun run() {
                    pool.connection.use { conn ->
                    try {

                        var bizId: Int? = null;
                        conn.prepareStatement("SELECT id FROM biz_businesses WHERE business_id = ?").use { stmt ->
                            stmt.setString(1, it.key)
                            stmt.executeQuery().use { rs ->
                                if (rs.next()) {
                                    bizId = rs.getInt("id")
                                }
                            }
                        }

                        println("Processing ${it.key}")

                        if (bizId == null) {
                            conn.prepareStatement(
                                """INSERT INTO biz_businesses(name, location, website, phone, logo, image_thumb, image_large, business_id, longitude, latitude, street_address, zipcode, city, hours) 
                                |VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT biz_cities.id FROM biz_cities WHERE biz_cities.name = ? AND biz_cities.country = ?), ?)""".trimMargin()
                            )
                                .use { stmt ->
                                    // name
                                    stmt.setString(1, it.value.name)
                                    // location
                                    stmt.setString(2, it.value.full_address)
                                    // website
                                    stmt.setString(3, it.value.website)
                                    // phone
                                    stmt.setString(4, it.value.phone)
                                    // logo
                                    stmt.setString(5, it.value.photosSample?.get(0)?.photo_url)
                                    // image_thumb
                                    stmt.setString(6, it.value.photosSample?.get(0)?.photo_url)
                                    // image_large
                                    stmt.setString(7, it.value.photosSample?.get(0)?.photo_url_large)
                                    // business_id
                                    stmt.setString(8, it.value.businessId)
                                    // long
                                    stmt.setDouble(9, it.value.longitude)
                                    // lat
                                    stmt.setDouble(10, it.value.latitude)
                                    // street_address
                                    stmt.setString(11, it.value.streetAddress)
                                    // zipcode
                                    stmt.setString(12, it.value.zipcode)
                                    // city
                                    stmt.setString(13, it.value.city)
                                    // country
                                    stmt.setString(14, it.value.country)
                                    // hours
                                    stmt.setObject(15, it.value.workingHours.toString(), java.sql.Types.OTHER)
                                    stmt.executeUpdate()

                                }
                        }
                    } catch (e: Exception) {
                        e.printStackTrace()

                    }
                    }

                    fin.incrementAndGet()
                }

            }, execPool)
            work.add(future)
        }
    }


    val allOf = CompletableFuture.allOf(*work.toTypedArray());
    do {
        Thread.sleep(1000)
        println("${fin.get()} / ${places.size}")
    } while (!allOf.isDone)

    execPool.shutdown()
    execPool.awaitTermination(20, java.util.concurrent.TimeUnit.SECONDS)
    println("fin: ${fin.get()} / ${places.size}")


}

@Suppress("ArrayInDataClass") // Array is used for JSON serialization
@Serializable
data class PlaceData(
    @SerialName("business_id") val businessId: String,
    // name
    val name: String,
    // location
    val full_address: String,
    // website
    val website: String?,
    // phone
    @SerialName("phone_number") val phone: String?,
    // logo - image_thumb, image_large
    @SerialName("photos_sample") val photosSample: Array<PhotoSample>?,
    // working_hours - This is a fairly questionable field, but it's a JSON object with keys as days of the week and values as working hours
    @SerialName("working_hours") val workingHours: JsonObject?,
    val latitude: Double,
    val longitude: Double,
    @SerialName("street_address") val streetAddress: String,
    val city: String,
    val zipcode: String,
    val country: String,
    val type: String,
    val subtypes: Array<String>
)

@Serializable
data class PhotoSample(val photo_url: String?, val photo_url_large: String?)

@Serializable
data class APIResponse(
    val status: String,
    @Serializable(with = UUIDSerializer::class) @SerialName("request_id") val requestId: UUID,
    val data: Array<PlaceData>
) {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as APIResponse

        if (status != other.status) return false
        if (requestId != other.requestId) return false
        if (!data.contentEquals(other.data)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = status.hashCode()
        result = 31 * result + requestId.hashCode()
        result = 31 * result + data.contentHashCode()
        return result
    }
}

@Serializable
data class Configuration(val jdbc: JDBCConfig)

@Serializable
data class JDBCConfig(val url: String, val user: String, val password: String)
