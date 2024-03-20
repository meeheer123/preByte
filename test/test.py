from ultralytics import YOLO

model = YOLO("ultralytics/yolov8n")  # Load from Hugging Face

results = model("C:\\Users\\itsoh\\Downloads\\DOG.jpeg")
print(results)