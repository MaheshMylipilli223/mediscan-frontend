import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

function ApolloBot() {

    const [fileText, setFileText] = useState("")
    const [fileStatus, setFileStatus] = useState("")
    const [apiKey, setApiKey] = useState("")
    const [question, setQuestion] = useState("")

    const handleInsertion = async (splitText) => {

        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: apiKey,
            batchSize: 512,
        });

        console.log("HI" + splitText)

        const vectorStore = await MemoryVectorStore.fromTexts(
            splitText,
            embeddings
        );

        const resultOne = await vectorStore.similaritySearch(question);
        console.log(resultOne);
    }

    const onFileUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const file = event.target.files[0];

            if (file) {
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const text = new TextDecoder('utf-8').decode(arrayBuffer);
                    setFileText(text);
                    setFileStatus("uploaded");
                    const splitText = text.split(" ");
                    handleInsertion(splitText);

                } catch (error) {
                    console.error('Error reading the file:', error);
                }
            }
        }
    }


    return (
        <div className="App">
            <header className="App-header" style={{ textAlign: "center", height: "5vh" }}>
                Apollo Beta 1.0
            </header>
            <Box sx={{ padding: 1 }}>
                <div style={{ height: "70vh", borderRadius: ".5em", border: "1px solid #efefef", boxShadow: "0 0 10px rgba(0,0,0,0.0875)" }}>
                    <input type="file" onChange={onFileUpload} name="docx-reader" />
                    {fileStatus}
                </div>
                <br />
                <Box sx={{ height: "10vh" }}>
                    <TextField id="API Key" label="OpenAI API Key" variant="outlined" sx={{ width: 1 }} onChange={(e) => setApiKey(e.target.value)} value={apiKey} />
                    <br /><br />
                    <Stack spacing={2} direction="row">
                        <TextField id="question" label="Question" variant="outlined" sx={{ width: 7 / 8 }} onChange={(e) => setQuestion(e.target.value)} value={question} />
                        <Button variant="contained" sx={{ width: 1 / 8 }}>ASK</Button>
                    </Stack>
                </Box>
            </Box>
        </div>
    );
}

export default ApolloBot;