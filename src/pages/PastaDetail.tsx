import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchPastaById} from "../services/pastaService";
import {Pasta} from "../types/Pasta";
// import {Slider} from "@radix-ui/react-slider";
import {Slider} from "@/components/ui/slider.tsx";

const PastaDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [pasta, setPasta] = useState<Pasta | null>(null);
    const [fontSize, setFontSize] = useState(16); // Default font size

    const handleFontSizeChange = (value: number) => {
        console.log(value)
        setFontSize(value);
    };


    useEffect(() => {
        fetchPastaDetail();
    }, [id]);

    const fetchPastaDetail = async () => {
        if (!id) return;
        try {
            const data = await fetchPastaById(parseInt(id));
            setPasta(data);
        } catch (error) {
            console.error("Error fetching pasta detail:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 text-2xl">
            {pasta ? (
                <div>
                    <div className="flex justify-between w-1/2">
                        <h1 className="text-4xl font-bold mb-4">
                            {pasta.processed_text.title}
                        </h1>
                        <Slider
                            className="w-1/2 m-2"
                            aria-label="Font Size"
                            value={[fontSize]}
                            onValueChange={handleFontSizeChange}
                            min={12} // Example: minimum font size
                            max={36} // Example: maximum font size
                            step={1} // Example: steps of font size change
                        />
                    </div>

                    <p>
                        {new Date(pasta.processed_text.date_published).toLocaleString()}
                    </p>
                    <div
                        style={{fontSize: `${fontSize}px`}}
                        // className="mt-4"
                        dangerouslySetInnerHTML={{__html: pasta.processed_text.body}}
                    />

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PastaDetail;
