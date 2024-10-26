import org.apache.tools.ant.taskdefs.ExecTask

plugins {
    kotlin("jvm") version "2.0.20"
    id("org.jetbrains.kotlin.plugin.serialization") version "2.1.0-Beta2"
    id("com.gradleup.shadow") version "8.3.3" // über jar
    application
}
val exposedVersion: String by project

group = "pw.valaria"
version = "1.0-SNAPSHOT"

application {
    mainClass = "pw.valaria.MainKt"
}

tasks.run.configure {
    workingDir = file("rundir")
}

tasks.runShadow.configure {
    workingDir = file("rundir")
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.3")

    // JDBC pool
    implementation("com.zaxxer:HikariCP:6.0.0")

    // postgresql
    implementation("org.postgresql:postgresql:42.7.4")



}

tasks.assemble {
    dependsOn(tasks.shadowJar)
}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(21)
}