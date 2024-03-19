from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)

cors = CORS(app, resources={r"/schedule-interviews": {"origins": "http://localhost:5173"}})



def schedule_interviews(candidate_data, start_time, end_time, interview_duration, break_time):
    current_date = datetime.date.today()
    scheduled_interviews = []

    while candidate_data:
        while current_date.weekday() >= 5:  # Saturday is 5, Sunday is 6
            current_date += datetime.timedelta(days=1)

        current_datetime = datetime.datetime.combine(current_date, start_time)
        available_slots = []

        while current_datetime + interview_duration <= datetime.datetime.combine(current_date, end_time):
            available_slots.append(current_datetime)
            current_datetime += interview_duration + break_time

        while available_slots and candidate_data:
            candidate = candidate_data.pop(0)
            try:
                name = candidate['name']
                email = candidate['email']
            except KeyError as e:
                # Handle missing keys in the candidate data
                app.logger.error(f"Missing key in candidate data: {e}")
                continue

            start_datetime = available_slots.pop(0)
            end_datetime = start_datetime + interview_duration
            scheduled_interviews.append({
                'name': name,
                'email': email,
                'date': current_date.strftime('%Y-%m-%d'),
                'start_time': start_datetime.strftime('%H:%M'),
                'end_time': end_datetime.strftime('%H:%M')
            })

        current_date += datetime.timedelta(days=1)

    return scheduled_interviews


@app.route('/schedule-interviews', methods=['POST'])
def schedule_interviews_api():
    request_data = request.json
    candidate_data = request_data.get('candidates')
    start_time = datetime.datetime.strptime(request_data.get('start_time'), '%H:%M').time()
    end_time = datetime.datetime.strptime(request_data.get('end_time'), '%H:%M').time()
    interview_duration = datetime.timedelta(minutes=int(request_data.get('interview_duration')))
    break_time = datetime.timedelta(minutes=int(request_data.get('break_time')))

    scheduled_interviews = schedule_interviews(candidate_data, start_time, end_time, interview_duration, break_time)
    
    return jsonify({'scheduled_interviews': scheduled_interviews})

if __name__ == '__main__':
    app.run(debug=True)
