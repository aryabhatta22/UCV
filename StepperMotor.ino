#include<Stepper.h>
#define STEPPER_PIN_1 8
#define STEPPER_PIN_2 9
#define STEPPER_PIN_3 10
#define STEPPER_PIN_4 11
int step_number = 0;
long int dayLength = 0;
long int PanelSleep = 0;
String inData = "";
bool needdaylength = true;
bool needpannelsleep = false;
bool gotData = false;
void setup() {
  pinMode(STEPPER_PIN_1, OUTPUT);
  pinMode(STEPPER_PIN_2, OUTPUT);
  pinMode(STEPPER_PIN_3, OUTPUT);
  pinMode(STEPPER_PIN_4, OUTPUT);
  Serial.begin(9600);

}

void loop() {

  if (Serial.available()) {
    Serial.println("Port Status = Writing");
    delay(1000);
    while (Serial.available()) {
      char  received = (char)Serial.read();

      if (received == '\n') {
        if (needdaylength) {
          dayLength = inData.toInt();
          Serial.print("Day Length = ");
          Serial.println(dayLength);
          inData = "";
          needdaylength = false;
          needpannelsleep = true;
          continue;
        }
        if (needpannelsleep) {
          PanelSleep = inData.toInt();
          Serial.print("Sleep time = ");
          Serial.println(PanelSleep);
          inData = "";
          needpannelsleep = false;
          gotData = true;
          continue;
        }

      }
      else {
        inData.concat(received);
      }

    }
    delay(2000);
  }
  else {
    Serial.println("Port Status = Not writing");
    Serial.print("Day Length = ");
          Serial.println(dayLength);
          Serial.print("Sleep time = ");
          Serial.println(PanelSleep);
    if (gotData ) {
      start();
    }
    delay(2000);
  }



}

void start() {
  int localdayLength = dayLength / 500;
  for (int a = 0; a < 500; a++) {
    OneStep(false);
    delay(localdayLength);
  }
  delay(1000);
  for (int a = 0; a < 500; a++) {
    OneStep(true);
    delay(2);
  }
  delay(PanelSleep);
}
void OneStep(bool dir) {
  if (dir) {
    switch (step_number) {
      case 0:
        digitalWrite(STEPPER_PIN_1, HIGH);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, LOW);
        break;
      case 1:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, HIGH);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, LOW);
        break;
      case 2:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, HIGH);
        digitalWrite(STEPPER_PIN_4, LOW);
        break;
      case 3:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, HIGH);
        break;
    }
  } else {
    switch (step_number) {
      case 0:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, HIGH);
        break;
      case 1:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, HIGH);
        digitalWrite(STEPPER_PIN_4, LOW);
        break;
      case 2:
        digitalWrite(STEPPER_PIN_1, LOW);
        digitalWrite(STEPPER_PIN_2, HIGH);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, LOW);
        break;
      case 3:
        digitalWrite(STEPPER_PIN_1, HIGH);
        digitalWrite(STEPPER_PIN_2, LOW);
        digitalWrite(STEPPER_PIN_3, LOW);
        digitalWrite(STEPPER_PIN_4, LOW);


    }
  }
  step_number++;
  if (step_number > 3) {
    step_number = 0;
  }
}
