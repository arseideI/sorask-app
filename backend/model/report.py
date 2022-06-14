from model.symptom_model import Symptom
from model.patient_model import Patient
from model.classification_model import Classification
from model.classification_symptom_model import ClassificationSymptom
from controller.classification_controller import ClassificationController

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

        dash = ClassificationController().get_dash()

        all_symptoms_today = []
        symptoms_today = dash["graph1"]
        header_st = [{"text": 'Sintomas', "style": 'tableHeader'}, {"text": 'Quantidade', "style": 'tableHeader'} ]
        all_symptoms_today.append(header_st)
        for symp in symptoms_today:
          all_symptoms_today.append([symp.get("NM_SYMPTOM"),symp.get("QNT")])
        
        all_symptoms_week = []
        symptoms_week = dash["graph3"]
        header_st = [{"text": 'Sintomas', "style": 'tableHeader'}, {"text": 'Quantidade', "style": 'tableHeader'} ]
        all_symptoms_week.append(header_st)
        for symp in symptoms_week:
          all_symptoms_week.append([symp.get("NM_SYMPTOM"),symp.get("QNT")])

        flags_today = dash["graph2"]
        all_flags_today = []
        header_st = [{"text": 'Cor da Flag', "style": 'tableHeader'}, {"text": 'Quantidade', "style": 'tableHeader'} ]
        all_flags_today.append(header_st)
        for flag in flags_today:
          all_flags_today.append([flag.get("COLOR_NM").get("name"),flag.get("VALUE")])

        flags_week = dash["graph4"]
        all_flags_week = []
        header_st = [{"text": 'Cor da Flag', "style": 'tableHeader'}, {"text": 'Quantidade', "style": 'tableHeader'} ]
        all_flags_week.append(header_st)
        for flag in flags_week:
          all_flags_week.append([flag.get("COLOR_NM").get("name"),flag.get("VALUE")])

        formatted = [
            {
          "text": 'Relatório de classificação  ||   '+ finalDate,
          "alignment": 'center',
          "fontSize": 15,
          "bold": True,
          "margin": [15,25,0,20]
        },
        {"text": 'Sintomas mais frequentes - 24 horas', "fontSize": 14, "bold": True, "margin":[35, 20, 0, 8]},
        {
          "table": {
            "headerRows":1,
            "body": all_symptoms_today
          },
          "layout": 'lightHorizontalLines',
          "margin": [35, 0, 0,0]
        },
        {"text": 'Sintomas mais frequentes - 7 dias', "fontSize": 14, "bold": True, "margin":[35, 20, 0, 8]},
        {
          "table": {
            "headerRows":1,
            "body": all_symptoms_week
          },
          "layout": 'lightHorizontalLines',
          "margin": [35, 0, 0,0]
        },
        {"text": 'Complexidade por Flag/Cor - 24 horas', "fontSize": 14, "bold": True, "margin":[35, 20, 0, 8]},
        {
          "table": {
            "headerRows":1,
            "body": all_flags_today
          },
          "layout": 'lightHorizontalLines',
          "margin": [35, 0, 0,0]
        },
        {"text": 'Complexidade por Flag/Cor - 7 dias', "fontSize": 14, "bold": True, "margin":[35, 35, 0, 8], "pageBreak": 'before'},
        {
          "table": {
            "headerRows":1,
            "body": all_flags_week
          },
          "layout": 'lightHorizontalLines',
          "margin": [35, 0, 0,0]
        },
        {"text": 'Indicadores Gerais', "fontSize": 14, "bold": True, "margin":[35, 20, 0, 8]},
        {
          "table": {
            "headerRows":0,
            "body": [
                [{"text": 'Categoria', "style": 'tableHeader'}, {"text": 'Quantidade', "style": 'tableHeader'} ],
                ['Pacientes', patient_count],
                ['Sintomas', symptoms_count],
                ['Classificações', classifications_count]
            ]
          },
          "layout": 'lightHorizontalLines',
          "margin": [35, 0, 0,0]
        }
        ]
        return formatted

    