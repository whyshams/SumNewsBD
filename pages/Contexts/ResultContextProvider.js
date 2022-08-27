import React,{useContext,createContext,useState,useEffect} from 'react';
import axios from 'axios';


const ResultContext = createContext();


export default function ResultContextProvider  ({children})  {
    const [bdNewsData,setBdNewsData] = useState([]); 

    const [bdNewsDataDiv, setBdNewsDataDiv] = useState([]);
    const [bdNewsDataCat, setBdNewsDataCat] = useState([]);
    
    const [catData,setCatData] = useState([]);


    const [sumData, setSumData] = useState();
    const [sumInput,setSumInput] = useState('');
    const [sumText,setSumText] = useState('');

    


    const [copied, setCopied] = useState(false);


 
    useEffect(() => {
      const getData = async () => {
       await axios.request(
          {
            method: 'POST',
            url : "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/",
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '8cf9a1f233msh0141a5b99787542p18d85ajsn9fde2eae0cd9',
              'X-RapidAPI-Host': 'tldrthis.p.rapidapi.com'
              },
            data: `{"url":"${sumInput}","min_length":100,"max_length":300,"is_detailed":true}`
        }).then((response)=>setSumData(response.data)).catch(err => console.log(err))

      }
      getData();
     
      },[sumInput])


  return (
    <ResultContext.Provider value={{bdNewsData,setBdNewsData,bdNewsDataDiv,setBdNewsDataDiv,catData,setCatData,sumData, setSumData,sumInput,setSumInput,sumText,setSumText,copied,setCopied,bdNewsDataCat, setBdNewsDataCat}}>
          {children}
        </ResultContext.Provider>
  )
}

export const useResultContext = () => useContext(ResultContext)
