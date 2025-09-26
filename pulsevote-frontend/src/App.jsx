import {useEffect, useState} from "react"
import './App.css'

// --- Internal

function App() {
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        fetch('/author')
            .then((res) => res.json())
            .then((json) => setAuthor(json))
            .catch(
                (e) => console.log(e)
            );
    }, []);

    // UI
    return (
        <div>
            <h2>Welcome to PulseVote</h2>
            {author && (
                <p>
                    <strong>{author.author}{" "}</strong>
                    <a href={author.github} target="_blank" rel="noopener noreferrer">
                        (GitHub)
                    </a>
                </p>
            )
            }
        </div>
    )
}

// --- Exported

export default App
