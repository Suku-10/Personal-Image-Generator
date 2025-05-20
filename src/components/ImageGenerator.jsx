// Importing necessary libraries and modules
import React, { useState, useEffect } from 'react'; // React library and specific hooks
import axios from 'axios'; // Axios for making HTTP requests
import "@fontsource/poppins";

// Defining a functional component called ImageGenerator
const ImageGenerator = () => {
    // Defining state variables
    const [text, setText] = useState(''); // State for storing the input text
    const [images, setImages] = useState([]); // State for storing the generated images
    const [loading, setLoading] = useState(false); // State for loading status
    const [buttonText, setButtonText] = useState('Random Image Generate'); // State for button text

    const apiKey = import.meta.env.VITE_API_KEY1
    const apiUrl = import.meta.env.VITE_API_URL1


    // useEffect hook to update button text based on input text
    useEffect(() => {
        setButtonText(text ? 'Generate Image' : 'Random Image Generate');
    }, [text]); // Dependency array with text to re-run effect when text changes

    // Function to generate images based on the input text
    const generateImage = async () => {
        setLoading(true); // Set loading to true when the function starts

        const randomPrompts = [
            'A futuristic cityscape at night',
            'A cat wearing sunglasses on the beach',
            'Surreal forest with glowing trees',
            'An astronaut walking on Mars',
            'A fantasy dragon flying over mountains'
        ];

        const finalPrompt = text.trim() || randomPrompts[Math.floor(Math.random() * randomPrompts.length)];

        const options = {
            method: 'GET',
            url: apiUrl,
            params: {
                prompt: finalPrompt,
                width: '1324',
                height: '1024',
                seed: '123456'
            },
            responseType: 'blob',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'ai-text-to-image-generator1.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const imageUrl = URL.createObjectURL(response.data);
            setImages([<img key={imageUrl} src={imageUrl} alt="Generated" className='h-[400px]' />]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false when the function ends
        }
    };

    // JSX for rendering the component
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Text to Image Generator</h1>
            <div className="flex flex-col items-center">
                <textarea
                    className="w-full text-xl font-bold text-white md:w-1/2 p-2 border border-gray-300 rounded mb-4 mt-2 outline-none"
                    rows="3"
                    placeholder="Enter text to generate your Image..."
                    value={text} // Bind the textarea value to the text state
                    onChange={(e) => setText(e.target.value)} // Update text state on change
                ></textarea>
                <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    onClick={generateImage} // Call generateImage function on click
                    disabled={loading} // Disable button if loading is true
                >
                    {loading ? 'Generating...' : buttonText}
                </button>
                <div className="mt-10">
                    {images}
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;