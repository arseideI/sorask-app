from model.report import Report

class ReportController:
    
    def get_report():

        report = Report.get_report()
        return report