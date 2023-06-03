import { useState } from "react";

export const SignupView = () => {
    
    // define useState
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState(null);


    // function to handle submit logic
    // 1. prevent default action or refresh page
    // 2. store user sign up info
    // 3. generate POST request
    // 4. return form to view with inputs and buttons

    let handleSubmit = (event) => {
        event.preventDefault();

        // store user input
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        // validate and send request with user data
        fetch("https://dd-myflix.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                alert("You've successfully registered");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                 Brithday:
                 <input 
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    
                 />
            </label>
            <button type="submit">Register</button>
        </form>
    )
}