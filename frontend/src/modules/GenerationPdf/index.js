import { Card, message, Button } from 'antd';
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import logo from '../../assets/img/logo.jpg'

const GenerationPdf = () =>{
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
    console.log("Data: ", finalDate)
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
      const details = [
        {
          text: 'Relatório de classificação  ||   '+ finalDate,
          alignment: 'center',
          fontSize: 15,
          bold: true,
          margin: [15,25,0,20]
        },
        {text: 'Sintomas mais frequêntes', fontSize: 14, bold: true, margin:[0, 20, 0, 8]},
        {
          table: {
            headerRows:1,
            body: [
              [{text: 'Sintomas', style: 'tableHeader'}, {text: 'Quantidade', style: 'tableHeader'} ],
              ['Corisa', 25],
              ['Dor de cabeça', 38],
              ['Insuficiência respiratória', 4]
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ];
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
      pdfMake.createPdf(docDefinitions).download();
    }
    return (
        <Card title={"Relatório"} style={{margin: 20}}>
            <Button onClick={makePdf}> Baixar Relatório</Button>
        </Card>
    );
}

export default GenerationPdf;