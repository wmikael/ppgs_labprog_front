import { DataTableComponent } from "../components/DataTableComponent";
import { Header } from "../components/Header";
import { useAuth } from "../utils/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";

// const data = [
//     {
//         name: "John",
//         age: 30,
//         city: "New York",
//         country: "USA",
//         occupation: "Engineer",
//         salary: 5000,
//         experience: 5,
//     },
//     {
//         name: "Jane",
//         age: 40,
//         city: "Chicago",
//         country: "USA",
//         occupation: "Doctor",
//         salary: 7000,
//         experience: 10,
//     },
//     {
//         name: "Bob",
//         age: 35,
//         city: "San Francisco",
//         country: "USA",
//         occupation: "Designer",
//         salary: 6000,
//         experience: 7,
//     },
//     {
//         name: "Alice",
//         age: 28,
//         city: "Los Angeles",
//         country: "USA",
//         occupation: "Artist",
//         salary: 4000,
//         experience: 3,
//     },
//     {
//         name: "Charlie",
//         age: 50,
//         city: "Boston",
//         country: "USA",
//         occupation: "Professor",
//         salary: 8000,
//         experience: 20,
//     },
//     {
//         name: "Dave",
//         age: 45,
//         city: "Seattle",
//         country: "USA",
//         occupation: "Software Developer",
//         salary: 9000,
//         experience: 15,
//     },
//     {
//         name: "Eve",
//         age: 38,
//         city: "Austin",
//         country: "USA",
//         occupation: "Architect",
//         salary: 6500,
//         experience: 8,
//     },
//     {
//         name: "Frank",
//         age: 42,
//         city: "Denver",
//         country: "USA",
//         occupation: "Chef",
//         salary: 5500,
//         experience: 12,
//     },
//     {
//         name: "Grace",
//         age: 32,
//         city: "Miami",
//         country: "USA",
//         occupation: "Photographer",
//         salary: 4500,
//         experience: 6,
//     },
//     {
//         name: "Heidi",
//         age: 36,
//         city: "Atlanta",
//         country: "USA",
//         occupation: "Journalist",
//         salary: 6000,
//         experience: 7,
//     },
//     {
//         name: "Ivan",
//         age: 41,
//         city: "Dallas",
//         country: "USA",
//         occupation: "Pilot",
//         salary: 7000,
//         experience: 11,
//     },
//     {
//         name: "Judy",
//         age: 39,
//         city: "Houston",
//         country: "USA",
//         occupation: "Scientist",
//         salary: 7500,
//         experience: 9,
//     },
//     {
//         name: "Mallory",
//         age: 33,
//         city: "Phoenix",
//         country: "USA",
//         occupation: "Musician",
//         salary: 4800,
//         experience: 5,
//     },
//     {
//         name: "Ned",
//         age: 47,
//         city: "Philadelphia",
//         country: "USA",
//         occupation: "Lawyer",
//         salary: 8500,
//         experience: 14,
//     },
//     {
//         name: "Olivia",
//         age: 31,
//         city: "San Diego",
//         country: "USA",
//         occupation: "Dancer",
//         salary: 4200,
//         experience: 4,
//     },
//     {
//         name: "Peggy",
//         age: 34,
//         city: "San Jose",
//         country: "USA",
//         occupation: "Actor",
//         salary: 5200,
//         experience: 6,
//     },
//     {
//         name: "Rupert",
//         age: 48,
//         city: "Austin",
//         country: "USA",
//         occupation: "Writer",
//         salary: 6200,
//         experience: 13,
//     },
//     {
//         name: "Sybil",
//         age: 29,
//         city: "Jacksonville",
//         country: "USA",
//         occupation: "Painter",
//         salary: 3900,
//         experience: 3,
//     },
//     {
//         name: "Trent",
//         age: 37,
//         city: "San Francisco",
//         country: "USA",
//         occupation: "Singer",
//         salary: 5800,
//         experience: 7,
//     },
//     {
//         name: "Victor",
//         age: 43,
//         city: "Indianapolis",
//         country: "USA",
//         occupation: "Director",
//         salary: 7300,
//         experience: 10,
//     },
//     {
//         name: "Walter",
//         age: 46,
//         city: "Columbus",
//         country: "USA",
//         occupation: "Producer",
//         salary: 7800,
//         experience: 12,
//     },
//     {
//         name: "Xavier",
//         age: 40,
//         city: "Fort Worth",
//         country: "USA",
//         occupation: "Engineer",
//         salary: 6700,
//         experience: 9,
//     },
//     {
//         name: "Yvonne",
//         age: 35,
//         city: "Charlotte",
//         country: "USA",
//         occupation: "Doctor",
//         salary: 6900,
//         experience: 7,
//     },
//     {
//         name: "Zoe",
//         age: 33,
//         city: "Detroit",
//         country: "USA",
//         occupation: "Designer",
//         salary: 5600,
//         experience: 6,
//     },
//     {
//         name: "Adam",
//         age: 38,
//         city: "El Paso",
//         country: "USA",
//         occupation: "Artist",
//         salary: 4700,
//         experience: 8,
//     },
//     {
//         name: "Betty",
//         age: 44,
//         city: "Memphis",
//         country: "USA",
//         occupation: "Professor",
//         salary: 7600,
//         experience: 11,
//     },
//     {
//         name: "Carl",
//         age: 42,
//         city: "Baltimore",
//         country: "USA",
//         occupation: "Software Developer",
//         salary: 7200,
//         experience: 10,
//     },
//     {
//         name: "Diana",
//         age: 36,
//         city: "Boston",
//         country: "USA",
//         occupation: "Architect",
//         salary: 6300,
//         experience: 7,
//     },
//     {
//         name: "Ethan",
//         age: 39,
//         city: "Nashville",
//         country: "USA",
//         occupation: "Chef",
//         salary: 5400,
//         experience: 9,
//     },
//     {
//         name: "Fiona",
//         age: 37,
//         city: "Louisville",
//         country: "USA",
//         occupation: "Photographer",
//         salary: 5100,
//         experience: 8,
//     },
// ];

export function TesteDataTable() {
  useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/producao/all-programas")
      .then((response) => {
        setData([...response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="teste">
      <div>
        <Header titulo="Produções" />
      </div>
      <div>{data.length > 0 && <DataTableComponent data={data} />}</div>
    </div>
  );
}
