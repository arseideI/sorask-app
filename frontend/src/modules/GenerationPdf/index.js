import { Card, message, Button } from 'antd';
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import logo from '../../assets/img/logo.jpg'

const { useState, useEffect } = React;


const GenerationPdf = () =>{
  let [classification, setClassification] = useState([]);
  let [steste, setSteste] = useState({
      loading: true
  });
  useEffect(() => {
      fetch('http://192.168.1.17:5000/report')
      .then(response => response.json())
      .then(data => getValues(data))
      .then(setSteste({loading: false}))
  }, []);

  
  let getValues = async (s) => {
      setClassification(s)

  }
    var datetime = new Date()
    const day = datetime.getDate()
    const month = (datetime.getMonth()+1)
    const year = datetime.getFullYear()
    
    const fullday = day + '/' + month + '/' + year

    const hour = datetime.getHours()
    const minute = datetime.getMinutes()
    const second = datetime.getSeconds()

    const fullhour = hour +':'+ minute + ':'+ second

    const finalDate = fullday + ' - ' + fullhour
    
    const makePdf =()=>{
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      
      const reportTitle = [
        {
          image: 'snow',
          alignment: 'center',
          width: 120,
          margin: [15,25,0,10]
        }

      ];
      const details = classification;
      const Rodape = (currentPage, pageCount)=>{
          return [
            {
              text: currentPage + '/' + pageCount,
              alignment: 'right',
              fontSize: 9,
              bold: true,
              margin: [0,10,20,0]
            }
          ]
      };

      const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50,15,40],

        header: [reportTitle],
        content: [details],
        footer: Rodape,
        images: {
          snow: 'https://i.ibb.co/LzSmmkJ/logoFull.png'
        }

      }
      pdfMake.createPdf(docDefinitions).download()
        
    }
    return (
        <Card title={"Relatório"} style={{margin: 20}}>
            <span>
              Aqui você poderar realizar o download do relatório referente aos ultimos 7 dias, contendo: <br/>
              • Sintomas mais frequentes <br/>
              • Quantidade de pacientes<br/>
              • Complexidade de casos<br/><br/><br/>
            </span>
            <Button onClick={makePdf}> Baixar Relatório</Button>
        </Card>
    );
}

export default GenerationPdf;