import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [profileList, setProfileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://com-achilles-yjack-default-rtdb.asia-southeast1.firebasedatabase.app/profile.json"
    );
    if (!response.ok) {
      throw new Error("something happened");
    }
    const data = await response.json();
    let profiles = [];

    const val = data[1];
    profiles.push({
      id: val.id,
      name: val.name,
      age: val.age
    });
    setProfileList(profiles);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occured...</p>}
      {profileList.map((profile) => {
        return (
          <div key={profile.id}>
            <p>{profile.id}</p>
            <p>{profile.name}</p>
            <p>{profile.age}</p>
          </div>
        );
      })}
    </div>
  );
}
