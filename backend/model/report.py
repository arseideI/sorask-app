from model.symptom_model import Symptom
from model.patient_model import Patient
from model.classification_model import Classification
from model.classification_symptom_model import ClassificationSymptom

from datetime import datetime



class Report:

    def get_report():
        report_body = []
        symptoms = Symptom().get_symptom_list()
        patients = Patient().patients_list()
        classifications = Classification(classification_symptom=ClassificationSymptom()).get_classification_list()

        patient_count = len(patients)
        symptoms_count = len(symptoms)
        classifications_count = len(classifications)
        finalDate = datetime.today().strftime('%d-%m-%Y - %H:%M:%S')

        formatted = [
            {
          "text": 'Relatório de classificação  ||   '+ finalDate,
          "alignment": 'center',
          "fontSize": 15,
          "bold": True,
          "margin": [15,25,0,20]
        },
        {"text": 'Sintomas mais frequêntes - 24 horas', "fontSize": 14, "bold": True, "margin":[0, 20, 0, 8]},
        {
          "table": {
            "headerRows":1,
            "body": [
              [{"text": 'Sintomas', "style": 'tableHeader'}, {"text": 'Quantidade', "style": 'tableHeader'} ],
              ['Febre', 10],
              ['Coceira', 3],
              ['Insuficiência respiratória', 2]
            ]
          },
          "layout": 'lightHorizontalLines'
        },{"text": 'Sintomas mais frequêntes - 7 dias', "fontSize": 14, "bold": True, "margin":[0, 20, 0, 8]},
        {
          "table": {
            "headerRows":1,
            "body": [
              [{"text": 'Sintomas', "style": 'tableHeader'}, {"text": 'Quantidade', "style": 'tableHeader'} ],
              ['Corisa', 25],
              ['Dor de cabeça', 19],
              ['Insuficiência respiratória', 4]
            ]
          },
          "layout": 'lightHorizontalLines'
        },
        {"text": 'Indicadores Gerais', "fontSize": 14, "bold": True, "margin":[0, 20, 0, 8]},
        {
          "table": {
            "headerRows":0,
            "body": [
                [{"text": 'Categoria', "style": 'tableHeader'}, {"text": 'Quantidade', "style": 'tableHeader'} ],
                ['Pacientes', patient_count],
                ['Sintomas', symptoms_count],
                ['Classificação', classifications_count]
            ]
          },
          "layout": 'lightHorizontalLines'
        }
        ]
        return formatted

    