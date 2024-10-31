import { FC } from "react";
import { Card, Stack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

interface Person {
name: string;
description: string;
img: string
github: string
linkedin: string
}

const About: FC = () => {
const people: Person[] = [
    { name: "Lewis Allen", description: "This is Lewis he is the best", img: "./LewisAvatar.png", github: "https://github.com/Lewis-Allen-2001", linkedin: "https://www.linkedin.com/in/lewis-allen-277321324/" },
    { name: "Shane Freeder", description: "This is Shane he likes sharpening knifes", img: "./ShaneAvatar.webp", github: "https://github.com/electronicboy", linkedin: "https://www.linkedin.com/in/shane-freeder/" },
    { name: "Michelle Ratcliffe", description: "This is Michelle she is cursed", img: "./michelleAvatar.webp", github: "https://github.com/michelleratcliffe", linkedin: "https://www.linkedin.com/in/michelleratcliffe397/" }
];

return (
  <>
<h1 className="text-center text-3xl font-bold mt-8 mb-4">Find it Fast Week 11/12 Project</h1>
<div className="people px-4">
    <h1 className="text-center text-2xl font-semibold mb-6">Meet The Team</h1>
    <Stack gap= "4" direction="row" wrap="wrap" justifyContent="center">
    {people.map((person) => (
    <Card.Root key={person.name} className=" rounded-lg w-80 p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out place-content-center">
        <Card.Body gap="2" alignItems="center">
        <Avatar src={person.img} size="lg" shape="rounded" className="w-24 h-24 rounded-full mb-4"/>
        <Card.Title mb="2" className=" text-center font-bold">
            {person.name}
        </Card.Title>
        <Card.Description className="text-center">
            {person.description}
        </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="center">
        <a href={person.github}>Github</a>
        <a href={person.linkedin}>Linkedin</a>
        </Card.Footer>
    </Card.Root>
    ))}
</Stack>
</div>

<div className="info mt-8 px-4">
  <h2 className="text-center text-2xl font-bold mb-4">
    About This Project
  </h2>
  <p className="text-center">
    Find it fast is a business directory to help users quickly find a business
    and its information. When clicking on a business, you can find their
    contact information and location.
  </p>
  <p className="text-center">
    We aim to provide a fast and easy user experience to help users write and
    view reviews made by others.
  </p>
</div>
 </>
)}
export default About;