// ============================================================
// COMPONENT EXAMPLE CODE LIBRARY
// Arduino 37-in-1 Kit + Extended Components
// Auto-generated from sensors-data.js
// N/A = No code applicable (hardware-only module)
// ============================================================

const componentExamples = [
  {
    id: 1,
    name: "Joystick",
    hasCode: true,
    arduino: `// Joystick Module Example
#define VRX_PIN A0  // X-axis
#define VRY_PIN A1  // Y-axis  
#define SW_PIN 2    // Button

void setup() {
  Serial.begin(9600);
  pinMode(SW_PIN, INPUT_PULLUP);
}

void loop() {
  int xValue = analogRead(VRX_PIN);
  int yValue = analogRead(VRY_PIN);
  int buttonState = digitalRead(SW_PIN);
  
  Serial.print("X: ");
  Serial.print(xValue);
  Serial.print(" | Y: ");
  Serial.print(yValue);
  Serial.print(" | Button: ");
  Serial.println(buttonState == LOW ? "PRESSED" : "RELEASED");
  
  delay(100);
}`,
    notes: "The joystick returns values from 0-1023 on each axis. Center position is approximately 512. Button is active LOW (pressed = 0)."
  },

  {
    id: 2,
    name: "Relay Module",
    hasCode: true,
    arduino: `// Relay Module Example
#define RELAY_PIN 7

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);  // Relay OFF initially
}

void loop() {
  // Turn relay ON
  digitalWrite(RELAY_PIN, HIGH);
  delay(2000);
  
  // Turn relay OFF
  digitalWrite(RELAY_PIN, LOW);
  delay(2000);
}`,
    notes: "IMPORTANT: Always provide interference suppression (flyback diode/snubber) for inductive loads like motors and solenoids."
  },

  {
    id: 3,
    name: "Big Sound",
    hasCode: true,
    arduino: `// Big Sound Sensor Example
#define SOUND_ANALOG A0
#define SOUND_DIGITAL 2

void setup() {
  Serial.begin(9600);
  pinMode(SOUND_DIGITAL, INPUT);
}

void loop() {
  int analogValue = analogRead(SOUND_ANALOG);
  int digitalValue = digitalRead(SOUND_DIGITAL);
  
  Serial.print("Sound Level: ");
  Serial.print(analogValue);
  Serial.print(" | Threshold Exceeded: ");
  Serial.println(digitalValue == HIGH ? "YES" : "NO");
  
  delay(100);
}`,
    notes: "Adjust the onboard potentiometer to set the threshold for digital output. Turn clockwise to increase sensitivity."
  },

  {
    id: 4,
    name: "Small Sound",
    hasCode: true,
    arduino: `// Small Sound Sensor - Clap Switch Example
#define SOUND_PIN 2
#define LED_PIN 13
bool ledState = false;

void setup() {
  pinMode(SOUND_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(SOUND_PIN) == HIGH) {
    ledState = !ledState;
    digitalWrite(LED_PIN, ledState);
    delay(500);  // Debounce delay
  }
}`,
    notes: "Smaller capsule means lower sensitivity - better for close-range detection to avoid false triggers."
  },

  {
    id: 5,
    name: "Tracking Sensor",
    hasCode: true,
    arduino: `// Line Following Sensor Example
#define LEFT_SENSOR 2
#define RIGHT_SENSOR 3
#define LEFT_MOTOR 5
#define RIGHT_MOTOR 6

void setup() {
  pinMode(LEFT_SENSOR, INPUT);
  pinMode(RIGHT_SENSOR, INPUT);
  pinMode(LEFT_MOTOR, OUTPUT);
  pinMode(RIGHT_MOTOR, OUTPUT);
}

void loop() {
  bool leftOnLine = digitalRead(LEFT_SENSOR) == LOW;
  bool rightOnLine = digitalRead(RIGHT_SENSOR) == LOW;
  
  if (leftOnLine && rightOnLine) {
    // Both sensors on line - go straight
    digitalWrite(LEFT_MOTOR, HIGH);
    digitalWrite(RIGHT_MOTOR, HIGH);
  } else if (leftOnLine) {
    // Turn right
    digitalWrite(LEFT_MOTOR, HIGH);
    digitalWrite(RIGHT_MOTOR, LOW);
  } else if (rightOnLine) {
    // Turn left
    digitalWrite(LEFT_MOTOR, LOW);
    digitalWrite(RIGHT_MOTOR, HIGH);
  }
}`,
    notes: "Output is active LOW (0 = obstacle detected). Adjust sensitivity with onboard potentiometer."
  },

  {
    id: 6,
    name: "Avoid Sensor",
    hasCode: true,
    arduino: `// Obstacle Avoidance Example
#define AVOID_SENSOR 2
#define ENABLE_PIN 3
#define BUZZER_PIN 4

void setup() {
  Serial.begin(9600);
  pinMode(AVOID_SENSOR, INPUT);
  pinMode(ENABLE_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  
  digitalWrite(ENABLE_PIN, LOW);  // Enable sensor
}

void loop() {
  if (digitalRead(AVOID_SENSOR) == LOW) {
    Serial.println("OBSTACLE DETECTED!");
    tone(BUZZER_PIN, 1000);  // Warning beep
    delay(100);
    noTone(BUZZER_PIN);
  } else {
    Serial.println("Path clear");
  }
  delay(200);
}`,
    notes: "Remove EN jumper to control sensor power via EN pin. LOW = sensor active, HIGH = sensor off. This saves power in battery applications."
  },

  {
    id: 7,
    name: "Flame Sensor",
    hasCode: true,
    arduino: `// Flame Detector Example
#define FLAME_DIGITAL 2
#define FLAME_ANALOG A0
#define ALARM_PIN 3

void setup() {
  Serial.begin(9600);
  pinMode(FLAME_DIGITAL, INPUT);
  pinMode(ALARM_PIN, OUTPUT);
}

void loop() {
  int flameIntensity = analogRead(FLAME_ANALOG);
  bool flameDetected = digitalRead(FLAME_DIGITAL);
  
  if (flameDetected) {
    Serial.println("WARNING: FLAME DETECTED!");
    digitalWrite(ALARM_PIN, HIGH);
  } else {
    digitalWrite(ALARM_PIN, LOW);
  }
  
  Serial.print("Flame Intensity: ");
  Serial.println(flameIntensity);
  delay(200);
}`,
    notes: "Spectral range: 720-1100nm. Detection angle: 60 degrees. Adjust threshold with potentiometer. NOT suitable as sole fire safety device!"
  },

  {
    id: 8,
    name: "Linear Hall Sensor",
    hasCode: true,
    arduino: `// Linear Hall Sensor Example
#define HALL_ANALOG A0
#define HALL_DIGITAL 2

void setup() {
  Serial.begin(9600);
  pinMode(HALL_DIGITAL, INPUT);
}

void loop() {
  int fieldStrength = analogRead(HALL_ANALOG);
  bool magnetDetected = digitalRead(HALL_DIGITAL);
  
  Serial.print("Field Strength: ");
  Serial.print(fieldStrength);
  Serial.print(" | Magnet Present: ");
  Serial.println(magnetDetected ? "YES" : "NO");
  
  // Determine polarity (approximate)
  if (fieldStrength > 550) {
    Serial.println("  -> North pole nearby");
  } else if (fieldStrength < 450) {
    Serial.println("  -> South pole nearby");
  }
  
  delay(200);
}`,
    notes: "Sensor responds to both poles. Analog value ~512 when no magnet present. Higher = one pole, Lower = opposite pole."
  },

  {
    id: 9,
    name: "Touch Sensor",
    hasCode: true,
    arduino: `// Touch Sensor Example
#define TOUCH_PIN 2
#define LED_PIN 13

bool ledState = false;
unsigned long lastTouch = 0;
const unsigned long debounceDelay = 300;

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(TOUCH_PIN) == HIGH) {
    if (millis() - lastTouch > debounceDelay) {
      ledState = !ledState;
      digitalWrite(LED_PIN, ledState);
      Serial.println(ledState ? "LED ON" : "LED OFF");
      lastTouch = millis();
    }
  }
}`,
    notes: "Output includes 50Hz mains hum - this is normal! Adjust sensitivity with potentiometer. Use debouncing in code."
  },

  {
    id: 10,
    name: "Digital Temperature",
    hasCode: true,
    arduino: `// Digital Temperature Sensor Example
#define TEMP_ANALOG A0
#define TEMP_DIGITAL 2
#define FAN_PIN 3

void setup() {
  Serial.begin(9600);
  pinMode(TEMP_DIGITAL, INPUT);
  pinMode(FAN_PIN, OUTPUT);
}

void loop() {
  int tempReading = analogRead(TEMP_ANALOG);
  bool overTemp = digitalRead(TEMP_DIGITAL);
  
  // Convert to approximate temperature (requires calibration)
  float voltage = tempReading * (5.0 / 1023.0);
  
  Serial.print("Temp Reading: ");
  Serial.print(tempReading);
  Serial.print(" | Over Temp: ");
  Serial.println(overTemp ? "YES" : "NO");
  
  // Turn on fan if temperature threshold exceeded
  digitalWrite(FAN_PIN, overTemp ? HIGH : LOW);
  
  delay(1000);
}`,
    notes: "NTC thermistor requires calibration for accurate readings. Use analog output with voltage divider equation, or just use for relative temperature sensing."
  },

  {
    id: 11,
    name: "Buzzer (Active)",
    hasCode: true,
    arduino: `// Active Buzzer Example
// WARNING: Reverse polarity!
// Connect '-' pin to 5V
// Connect 'S' pin to GND

#define BUZZER_CONTROL 7  // Control via transistor/relay

void setup() {
  pinMode(BUZZER_CONTROL, OUTPUT);
}

void loop() {
  // Beep pattern
  digitalWrite(BUZZER_CONTROL, HIGH);
  delay(200);
  digitalWrite(BUZZER_CONTROL, LOW);
  delay(200);
  digitalWrite(BUZZER_CONTROL, HIGH);
  delay(200);
  digitalWrite(BUZZER_CONTROL, LOW);
  delay(1000);
}`,
    notes: "CRITICAL: This buzzer has REVERSED polarity! Connect positive to '-' pin and ground to 'S' pin. Frequency: 4000Hz, 80dB minimum."
  },

  {
    id: 12,
    name: "Passive Buzzer",
    hasCode: true,
    arduino: `// Passive Buzzer - Melody Example
#define BUZZER_PIN 9  // Must be PWM pin

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  // Play a simple melody
  tone(BUZZER_PIN, 262);  // C4
  delay(300);
  tone(BUZZER_PIN, 294);  // D4
  delay(300);
  tone(BUZZER_PIN, 330);  // E4
  delay(300);
  tone(BUZZER_PIN, 349);  // F4
  delay(300);
  noTone(BUZZER_PIN);
  delay(1000);
}

// Note frequencies (Hz)
// C4=262, D4=294, E4=330, F4=349, G4=392, A4=440, B4=494`,
    notes: "Use tone() function to generate frequencies. Polarity doesn't matter for speaker. Connect one side to PWM pin, other to GND."
  },

  {
    id: 13,
    name: "RGB LED",
    hasCode: true,
    arduino: `// RGB LED Example (corrected pins)
// WARNING: PCB labels are wrong!
#define BLUE_PIN 9    // Labeled 'R' on PCB
#define GREEN_PIN 10  // Labeled 'G' on PCB
#define RED_PIN 11    // Labeled 'B' on PCB

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
}

void setColor(int red, int green, int blue) {
  analogWrite(RED_PIN, red);
  analogWrite(GREEN_PIN, green);
  analogWrite(BLUE_PIN, blue);
}

void loop() {
  setColor(255, 0, 0);    // Red
  delay(1000);
  setColor(0, 255, 0);    // Green
  delay(1000);
  setColor(0, 0, 255);    // Blue
  delay(1000);
  setColor(255, 255, 0);  // Yellow
  delay(1000);
  setColor(0, 255, 255);  // Cyan
  delay(1000);
  setColor(255, 0, 255);  // Magenta
  delay(1000);
}`,
    notes: "PCB PRINTING ERROR: 'R' pin is actually BLUE, 'B' pin is actually RED! Has built-in 150 ohm resistors - safe for direct connection to Arduino."
  },

  {
    id: 14,
    name: "SMD RGB LED",
    hasCode: true,
    arduino: `// SMD RGB LED Example (corrected pins + resistors)
// WARNING: PCB labels are wrong! Add 220 ohm resistors!
#define GREEN_PIN 9   // Labeled 'R' on PCB
#define RED_PIN 10    // Labeled 'G' on PCB  
#define BLUE_PIN 11   // Labeled 'B' on PCB

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
}

void loop() {
  // Rainbow effect
  for (int i = 0; i < 256; i++) {
    analogWrite(RED_PIN, (i < 85) ? i * 3 : (i < 170) ? 255 - (i - 85) * 3 : 0);
    analogWrite(GREEN_PIN, (i < 85) ? 0 : (i < 170) ? (i - 85) * 3 : 255 - (i - 170) * 3);
    analogWrite(BLUE_PIN, (i < 85) ? 255 - i * 3 : (i < 170) ? 0 : (i - 170) * 3);
    delay(10);
  }
}`,
    notes: "PCB ERROR: 'R' is GREEN, 'G' is RED. NO built-in resistors - add 220 ohm resistor to each color pin! Damage may occur without resistors."
  },

  {
    id: 15,
    name: "Two-Color 5mm LED",
    hasCode: true,
    arduino: `// Two-Color 5mm LED Example
#define RED_PIN 9
#define GREEN_PIN 10

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
}

void loop() {
  // Red
  digitalWrite(RED_PIN, HIGH);
  digitalWrite(GREEN_PIN, LOW);
  delay(1000);
  
  // Green
  digitalWrite(RED_PIN, LOW);
  digitalWrite(GREEN_PIN, HIGH);
  delay(1000);
  
  // Orange (both on)
  digitalWrite(RED_PIN, HIGH);
  digitalWrite(GREEN_PIN, HIGH);
  delay(1000);
  
  // Off
  digitalWrite(RED_PIN, LOW);
  digitalWrite(GREEN_PIN, LOW);
  delay(1000);
}`,
    notes: "Add 220 ohm resistor to each color pin. Can mix colors by turning both on simultaneously to create orange/yellow."
  },

  {
    id: 16,
    name: "Two-Color 3mm LED",
    hasCode: true,
    arduino: `// Two-Color 3mm LED - Traffic Light Example
#define RED_PIN 9
#define GREEN_PIN 10

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
}

void loop() {
  // Red light
  analogWrite(RED_PIN, 255);
  analogWrite(GREEN_PIN, 0);
  delay(3000);
  
  // Yellow (transition)
  analogWrite(RED_PIN, 255);
  analogWrite(GREEN_PIN, 128);
  delay(1000);
  
  // Green light
  analogWrite(RED_PIN, 0);
  analogWrite(GREEN_PIN, 255);
  delay(3000);
}`,
    notes: "Identical to 5mm version but smaller form factor. Add 220 ohm resistors. Great for compact projects."
  },

  {
    id: 17,
    name: "Reed Switch",
    hasCode: true,
    arduino: `// Reed Switch - Door Sensor Example
#define REED_DIGITAL 2
#define ALARM_PIN 3

void setup() {
  Serial.begin(9600);
  pinMode(REED_DIGITAL, INPUT);
  pinMode(ALARM_PIN, OUTPUT);
}

void loop() {
  bool magnetPresent = digitalRead(REED_DIGITAL);
  
  if (magnetPresent) {
    Serial.println("Door CLOSED");
    digitalWrite(ALARM_PIN, LOW);
  } else {
    Serial.println("Door OPEN!");
    digitalWrite(ALARM_PIN, HIGH);
  }
  
  delay(500);
}`,
    notes: "Reed switch closes when magnet is nearby. Perfect for non-contact switching applications like door/window sensors."
  },

  {
    id: 18,
    name: "Mini Reed Switch",
    hasCode: true,
    arduino: `// Mini Reed Switch Example
#define REED_PIN 2

void setup() {
  Serial.begin(9600);
  pinMode(REED_PIN, INPUT_PULLUP);
}

void loop() {
  bool magnetNear = digitalRead(REED_PIN) == LOW;
  
  Serial.println(magnetNear ? "Magnet detected" : "No magnet");
  delay(200);
}`,
    notes: "Built-in 10k ohm resistor between middle and 'S' pins. Can be configured as pull-up or pull-down depending on wiring."
  },

  {
    id: 19,
    name: "Heartbeat Sensor",
    hasCode: true,
    arduino: `// Heartbeat Sensor Example (basic)
#define HEARTBEAT_PIN A0
#define THRESHOLD 512

int beats = 0;
unsigned long lastBeat = 0;

void setup() {
  Serial.begin(9600);
  pinMode(HEARTBEAT_PIN, INPUT);
}

void loop() {
  int sensorValue = analogRead(HEARTBEAT_PIN);
  
  // Simple peak detection
  if (sensorValue > THRESHOLD && millis() - lastBeat > 300) {
    beats++;
    lastBeat = millis();
    Serial.print("Beat detected! Count: ");
    Serial.println(beats);
  }
  
  delay(10);
}`,
    notes: "This is a basic sensor requiring external amplification for reliable results. 330 ohm LED resistor included. Has built-in pull-up on sensor output."
  },

  {
    id: 20,
    name: "7-Color Flash LED",
    hasCode: true,
    arduino: `// 7-Color Flash LED Example
// This LED auto-cycles through colors
// Just connect power to control on/off
#define LED_CONTROL 7

void setup() {
  pinMode(LED_CONTROL, OUTPUT);
}

void loop() {
  // Turn on for 5 seconds
  digitalWrite(LED_CONTROL, HIGH);
  delay(5000);
  
  // Turn off for 2 seconds
  digitalWrite(LED_CONTROL, LOW);
  delay(2000);
}`,
    notes: "Built-in controller cycles through 7 colors automatically. Cannot control individual colors. Just an on/off device."
  },

  {
    id: 21,
    name: "Laser Emitter",
    hasCode: true,
    arduino: `// Laser Module Example
#define LASER_PIN 7

void setup() {
  pinMode(LASER_PIN, OUTPUT);
  digitalWrite(LASER_PIN, LOW);
}

void loop() {
  // Pulse laser (tripwire simulator)
  digitalWrite(LASER_PIN, HIGH);
  delay(100);
  digitalWrite(LASER_PIN, LOW);
  delay(100);
}`,
    notes: "650nm wavelength red laser. Designed for 5V direct connection or transistor control. NEVER point at eyes."
  },

  {
    id: 22,
    name: "Push Button",
    hasCode: true,
    arduino: `// Push Button Example with debouncing
#define BUTTON_PIN 2
#define LED_PIN 13

bool ledState = false;
bool lastButtonState = HIGH;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  bool reading = digitalRead(BUTTON_PIN);
  
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading == LOW) {  // Button pressed
      ledState = !ledState;
      digitalWrite(LED_PIN, ledState);
      while(digitalRead(BUTTON_PIN) == LOW);  // Wait for release
    }
  }
  
  lastButtonState = reading;
}`,
    notes: "Built-in 10k ohm resistor simplifies wiring. Use INPUT_PULLUP mode or wire external pull-up/down resistor."
  },

  {
    id: 23,
    name: "Shock Sensor",
    hasCode: true,
    arduino: `// Shock Sensor - Vibration Alarm
#define SHOCK_PIN 2
#define ALARM_PIN 3

void setup() {
  Serial.begin(9600);
  pinMode(SHOCK_PIN, INPUT_PULLUP);
  pinMode(ALARM_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(SHOCK_PIN) == LOW) {
    Serial.println("SHOCK DETECTED!");
    
    // Sound alarm
    for (int i = 0; i < 3; i++) {
      digitalWrite(ALARM_PIN, HIGH);
      delay(100);
      digitalWrite(ALARM_PIN, LOW);
      delay(100);
    }
    
    delay(1000);  // Debounce
  }
}`,
    notes: "Detects sudden movement, vibration, or impact. Ball inside rolls to make contact. Less sensitive than true accelerometer."
  },

  {
    id: 24,
    name: "Rotary Encoder",
    hasCode: true,
    arduino: `// Rotary Encoder Example
#define CLK_PIN 2
#define DT_PIN 3
#define SW_PIN 4

int counter = 0;
int currentStateCLK;
int lastStateCLK;

void setup() {
  Serial.begin(9600);
  pinMode(CLK_PIN, INPUT);
  pinMode(DT_PIN, INPUT);
  pinMode(SW_PIN, INPUT_PULLUP);
  
  lastStateCLK = digitalRead(CLK_PIN);
}

void loop() {
  currentStateCLK = digitalRead(CLK_PIN);
  
  if (currentStateCLK != lastStateCLK && currentStateCLK == 1) {
    if (digitalRead(DT_PIN) != currentStateCLK) {
      counter++;
      Serial.print("Clockwise: ");
    } else {
      counter--;
      Serial.print("Counter-clockwise: ");
    }
    Serial.println(counter);
  }
  
  lastStateCLK = currentStateCLK;
  
  // Check button press
  if (digitalRead(SW_PIN) == LOW) {
    Serial.println("Button pressed! Counter reset.");
    counter = 0;
    delay(300);  // Debounce
  }
}`,
    notes: "Quadrature encoder outputs CLK and DT signals. Direction determined by phase relationship. Button is active LOW."
  },

  {
    id: 25,
    name: "Light Cup (Tilt with LED)",
    hasCode: true,
    arduino: `// Light Cup - Tilt Activated LED
#define TILT_PIN 2
#define LED_PIN 9  // PWM pin

void setup() {
  pinMode(TILT_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  bool tilted = digitalRead(TILT_PIN) == HIGH;
  
  if (tilted) {
    // Fade LED in when tilted
    for (int i = 0; i <= 255; i++) {
      analogWrite(LED_PIN, i);
      delay(5);
    }
  } else {
    // Fade LED out when upright
    for (int i = 255; i >= 0; i--) {
      analogWrite(LED_PIN, i);
      delay(5);
    }
  }
}`,
    notes: "Mercury switch changes state based on tilt angle. LED requires 220 ohm series resistor. Built-in 10k ohm pull-up on switch."
  },

  {
    id: 26,
    name: "Tilt Switch",
    hasCode: true,
    arduino: `// Tilt Switch Example
#define TILT_PIN 2
#define LED_PIN 13

void setup() {
  Serial.begin(9600);
  pinMode(TILT_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  bool tilted = digitalRead(TILT_PIN) == LOW;
  
  digitalWrite(LED_PIN, tilted);
  Serial.println(tilted ? "TILTED" : "UPRIGHT");
  delay(200);
}`,
    notes: "Mercury flows to make/break contact based on tilt. Two-state switch - typically horizontal vs tilted."
  },

  {
    id: 27,
    name: "Rolling Ball Tilt Switch",
    hasCode: true,
    arduino: `// Rolling Ball Tilt Switch
// Tilt detection with hysteresis
#define TILT_PIN 2
#define LED_PIN 13

bool lastTiltState = false;
unsigned long lastChangeTime = 0;
const unsigned long hysteresis = 100;

void setup() {
  Serial.begin(9600);
  pinMode(TILT_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  bool currentTilt = digitalRead(TILT_PIN) == LOW;
  
  if (currentTilt != lastTiltState) {
    if (millis() - lastChangeTime > hysteresis) {
      lastTiltState = currentTilt;
      lastChangeTime = millis();
      
      digitalWrite(LED_PIN, currentTilt);
      Serial.println(currentTilt ? "TILTED" : "LEVEL");
    }
  }
}`,
    notes: "Eco-friendly alternative to mercury switches. Built-in 10k ohm resistor. Max switching: 12VDC 50mA."
  },

  {
    id: 28,
    name: "Photoresistor (LDR)",
    hasCode: true,
    arduino: `// Photoresistor - Auto Night Light
#define LDR_PIN A0
#define LED_PIN 9

int threshold = 300;  // Adjust based on your environment

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int lightLevel = analogRead(LDR_PIN);
  
  Serial.print("Light level: ");
  Serial.println(lightLevel);
  
  if (lightLevel < threshold) {
    // Dark - turn on LED with brightness inversely proportional to light
    int brightness = map(lightLevel, 0, threshold, 255, 0);
    analogWrite(LED_PIN, brightness);
    Serial.println("  LED ON");
  } else {
    // Bright - turn off LED  
    analogWrite(LED_PIN, 0);
    Serial.println("  LED OFF");
  }
  
  delay(100);
}`,
    notes: "Forms voltage divider with 10k ohm resistor. Lower readings = darker. Higher readings = brighter. Calibrate threshold for your environment."
  },

  {
    id: 29,
    name: "DHT11 Temp & Humidity",
    hasCode: true,
    arduino: `// DHT11 Temperature & Humidity Sensor
// Install DHT sensor library first (DHT.h)
#include <DHT.h>

#define DHT_PIN 2
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.println("DHT11 Sensor Ready");
}

void loop() {
  delay(2000);  // DHT11 needs 2s between readings
  
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print("% | Temperature: ");
  Serial.print(temperature);
  Serial.println("C");
}`,
    notes: "Requires DHT.h library (install via Library Manager). Built-in 10k ohm pull-up included. Wait 2 seconds between readings."
  },

  {
    id: 30,
    name: "Analog Hall Sensor",
    hasCode: true,
    arduino: `// Analog Hall Sensor - RPM Counter
#define HALL_PIN 2

volatile unsigned long pulseCount = 0;
unsigned long lastCalc = 0;

void setup() {
  Serial.begin(9600);
  pinMode(HALL_PIN, INPUT);
  attachInterrupt(digitalPinToInterrupt(HALL_PIN), countPulse, FALLING);
}

void countPulse() {
  pulseCount++;
}

void loop() {
  if (millis() - lastCalc >= 1000) {
    // Calculate RPM (assuming 1 magnet per revolution)
    unsigned long rpm = pulseCount * 60;
    
    Serial.print("RPM: ");
    Serial.println(rpm);
    
    pulseCount = 0;
    lastCalc = millis();
  }
}`,
    notes: "Built-in LED lights when magnet detected. Output is active LOW (goes LOW when magnet near). Good for digital applications only."
  },

  {
    id: 31,
    name: "Hall Magnetic Sensor",
    hasCode: true,
    arduino: `// Hall Magnetic Sensor - Analog Reading
#define HALL_PIN A0

int baseline = 512;  // Calibrate this value

void setup() {
  Serial.begin(9600);
  
  // Calibration: read baseline with no magnet
  delay(1000);
  long sum = 0;
  for (int i = 0; i < 100; i++) {
    sum += analogRead(HALL_PIN);
    delay(10);
  }
  baseline = sum / 100;
  
  Serial.print("Baseline calibrated to: ");
  Serial.println(baseline);
}

void loop() {
  int reading = analogRead(HALL_PIN);
  int fieldStrength = reading - baseline;
  
  Serial.print("Raw: ");
  Serial.print(reading);
  Serial.print(" | Field: ");
  Serial.print(fieldStrength);
  
  if (abs(fieldStrength) < 20) {
    Serial.println(" | No magnet");
  } else if (fieldStrength > 0) {
    Serial.println(" | North pole");
  } else {
    Serial.println(" | South pole");
  }
  
  delay(200);
}`,
    notes: "Analog output varies with magnetic field strength AND polarity. Approx 512 (2.5V) with no field. Higher = one pole, lower = opposite pole."
  },

  {
    id: 32,
    name: "DS18B20 Temperature",
    hasCode: true,
    arduino: `// DS18B20 Temperature Sensor
// Install OneWire and DallasTemperature libraries
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 2

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(9600);
  sensors.begin();
  Serial.println("DS18B20 Temperature Sensor");
}

void loop() {
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);
  
  Serial.print("Temperature: ");
  Serial.print(tempC);
  Serial.print("C (");
  Serial.print(tempC * 9.0 / 5.0 + 32.0);
  Serial.println("F)");
  
  delay(1000);
}`,
    notes: "Requires OneWire and DallasTemperature libraries. Multiple sensors can share one data pin. Each sensor has a unique 64-bit address. Range: -55C to +125C."
  },

  {
    id: 33,
    name: "Thermistor (NTC)",
    hasCode: true,
    arduino: `// NTC Thermistor Temperature Sensor
#define THERMISTOR_PIN A0

const float BETA = 3950;  // Beta coefficient
const float R0 = 10000;   // Resistance at 25C
const float T0 = 298.15;  // 25C in Kelvin

void setup() {
  Serial.begin(9600);
}

void loop() {
  int raw = analogRead(THERMISTOR_PIN);
  
  // Calculate thermistor resistance
  float voltage = raw * 5.0 / 1023.0;
  float resistance = (10000.0 * voltage) / (5.0 - voltage);
  
  // Steinhart-Hart equation (simplified Beta formula)
  float tempK = 1.0 / ((1.0 / T0) + (1.0 / BETA) * log(resistance / R0));
  float tempC = tempK - 273.15;
  float tempF = tempC * 9.0 / 5.0 + 32.0;
  
  Serial.print("Temperature: ");
  Serial.print(tempC, 1);
  Serial.print("C (");
  Serial.print(tempF, 1);
  Serial.println("F)");
  
  delay(1000);
}`,
    notes: "Forms voltage divider with 10k ohm resistor. Requires calibration for accurate absolute readings. Beta value varies by thermistor - check datasheet."
  },

  {
    id: 34,
    name: "IR Transmitter LED",
    hasCode: true,
    arduino: `// IR Transmitter - Send NEC Protocol
// Install IRremote library
#include <IRremote.h>

#define IR_LED_PIN 3

IRsend irsend;

void setup() {
  Serial.begin(9600);
  IrSender.begin(IR_LED_PIN);
}

void loop() {
  // Send NEC protocol code (example: 0x20DF10EF)
  IrSender.sendNEC(0x20DF10EF, 32);
  Serial.println("IR Signal Sent");
  delay(2000);
}

// Simple light barrier example (no library)
void lightBarrier() {
  pinMode(3, OUTPUT);
  
  // Pulse IR LED at 38kHz
  for (int i = 0; i < 380; i++) {
    digitalWrite(3, HIGH);
    delayMicroseconds(13);  // ~38kHz
    digitalWrite(3, LOW);
    delayMicroseconds(13);
  }
}`,
    notes: "Add current-limiting resistor (~100-220 ohm). For IR remote control, use IRremote library and modulate at 38kHz. For light barriers, continuous or pulsed operation."
  },

  {
    id: 35,
    name: "IR Receiver",
    hasCode: true,
    arduino: `// IR Receiver - Decode Remote Control
// Install IRremote library
#include <IRremote.h>

#define IR_RECEIVE_PIN 2

void setup() {
  Serial.begin(9600);
  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);
  Serial.println("IR Receiver Ready");
}

void loop() {
  if (IrReceiver.decode()) {
    Serial.print("Received: 0x");
    Serial.print(IrReceiver.decodedIRData.decodedRawData, HEX);
    Serial.print(" | Protocol: ");
    Serial.println(IrReceiver.decodedIRData.protocol);
    
    IrReceiver.resume();  // Ready for next signal
  }
}`,
    notes: "Frequency: 37.9kHz (works with standard 38kHz remotes). Range: ~18m. Receiving angle: 90 degrees. Requires IRremote library for decoding."
  },

  {
    id: 36,
    name: "Tap Module (Vibration)",
    hasCode: true,
    arduino: `// Tap/Vibration Sensor - Knock Detector
#define TAP_PIN 2
#define LED_PIN 13

int knockCount = 0;
unsigned long lastKnock = 0;
const unsigned long knockTimeout = 1000;  // Reset after 1 second

void setup() {
  Serial.begin(9600);
  pinMode(TAP_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(TAP_PIN) == LOW) {
    knockCount++;
    Serial.print("Knock #");
    Serial.println(knockCount);
    
    lastKnock = millis();
    
    // Flash LED
    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);
    
    delay(200);  // Debounce
  }
  
  // Reset knock count after timeout
  if (millis() - lastKnock > knockTimeout && knockCount > 0) {
    Serial.print("Total knocks: ");
    Serial.println(knockCount);
    knockCount = 0;
  }
}`,
    notes: "Momentary contact when vibration detected. Bouncy signal - requires debouncing. Sensitivity depends on mounting and mechanical coupling."
  },

  {
    id: 37,
    name: "Light Blocking (Slotted Sensor)",
    hasCode: true,
    arduino: `// Slotted Optical Sensor - RPM Counter
#define SLOT_PIN 2

volatile unsigned long pulseCount = 0;
unsigned long lastDisplay = 0;

void setup() {
  Serial.begin(9600);
  pinMode(SLOT_PIN, INPUT);
  attachInterrupt(digitalPinToInterrupt(SLOT_PIN), countPulse, FALLING);
  Serial.println("Slotted Sensor RPM Counter");
}

void countPulse() {
  pulseCount++;
}

void loop() {
  if (millis() - lastDisplay >= 1000) {
    // Display counts per second
    Serial.print("Pulses: ");
    Serial.print(pulseCount);
    Serial.print(" | RPM: ");
    Serial.println(pulseCount * 60);  // Assumes 1 slot per revolution
    
    pulseCount = 0;
    lastDisplay = millis();
  }
}`,
    notes: "Output has 10k ohm pull-up to 5V. Goes LOW when IR beam blocked, HIGH when clear. Perfect for encoders and RPM measurement."
  },

  {
    id: 38,
    name: "Ultrasonic Distance Sensor (HC-SR04)",
    hasCode: true,
    arduino: `// HC-SR04 Ultrasonic Distance Sensor
#define TRIG_PIN 9
#define ECHO_PIN 10

long duration;
int distance;

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.begin(9600);
}

void loop() {
  // Clear the trigger pin
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  // Send a 10 microsecond pulse
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Read the echo pin (travel time in microseconds)
  duration = pulseIn(ECHO_PIN, HIGH);

  // Calculate distance in cm
  // Speed of sound is ~343m/s or 0.0343 cm/us. 
  // Divided by 2 because the sound goes out and back.
  distance = duration * 0.0343 / 2;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  delay(200);
}`,
    notes: "Distance calculation: Distance = (Time x Speed of Sound) / 2. At sea level, Speed of Sound approx 343 m/s. Effective range: 2cm to 400cm."
  },

  {
    id: 39,
    name: "HW-131 Breadboard Power Supply",
    hasCode: false,
    arduino: "N/A",
    notes: "This is a hardware power module. No code required. Set output voltage with jumpers (3.3V or 5V) before connecting sensitive components. Input: 6.5V-12V DC."
  },

  {
    id: 40,
    name: "DS3231 Precision Real-Time Clock",
    hasCode: true,
    arduino: `// DS3231 RTC Basic Time Read (Requires RTClib)
#include <Wire.h>
#include "RTClib.h"

RTC_DS3231 rtc;

void setup() {
  Serial.begin(9600);

  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }

  if (rtc.lostPower()) {
    Serial.println("RTC lost power, setting the time!");
    // Sets the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }
}

void loop() {
  DateTime now = rtc.now();

  Serial.print(now.year(), DEC);
  Serial.print('/');
  Serial.print(now.month(), DEC);
  Serial.print('/');
  Serial.print(now.day(), DEC);
  Serial.print(" ");
  Serial.print(now.hour(), DEC);
  Serial.print(':');
  Serial.print(now.minute(), DEC);
  Serial.print(':');
  Serial.println(now.second(), DEC);

  delay(1000);
}`,
    notes: "Uses I2C protocol. Default address is 0x68. Requires a CR2032 coin cell battery to keep time while Arduino is powered off. Requires RTClib library."
  },

  {
    id: 41,
    name: "Soil Moisture Sensor (FC-28 / YL-69)",
    hasCode: true,
    arduino: `// Soil Moisture Sensor - Analog Reading
#define SENSOR_PIN A0

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT);
  Serial.println("Soil Moisture Sensor Ready");
}

void loop() {
  int rawValue = analogRead(SENSOR_PIN);
  
  // Convert to percentage: 1023 is bone dry, 0 is submerged in water
  // Note: Calibration is required for your specific soil type
  int moisturePercent = map(rawValue, 1023, 0, 0, 100);
  moisturePercent = constrain(moisturePercent, 0, 100);

  Serial.print("Raw Value: ");
  Serial.print(rawValue);
  Serial.print(" | Moisture: ");
  Serial.print(moisturePercent);
  Serial.println("%");

  delay(1000);
}`,
    notes: "Analog output (A0) is inverted logically: higher values mean drier soil. Use map() to convert 0-1023 range to 0-100%. Calibration recommended for your soil type."
  },

  {
    id: 42,
    name: "MPU-6050 (Accelerometer + Gyroscope)",
    hasCode: true,
    arduino: `// MPU-6050 Basic Reading (Requires Adafruit_MPU6050 library)
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

Adafruit_MPU6050 mpu;

void setup() {
  Serial.begin(115200);

  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) yield();
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  Serial.print("Accel X: "); Serial.print(a.acceleration.x);
  Serial.print(" | Gyro X: "); Serial.print(g.gyro.x);
  Serial.println(" rad/s");

  delay(100);
}`,
    notes: "I2C address is 0x68 by default. The accelerometer measures gravity (9.81 m/s^2). Gyroscopes drift over time - use complementary or Kalman filter for stable orientation."
  },

  {
    id: 43,
    name: "Micro SD Card Module",
    hasCode: true,
    arduino: `// Micro SD Card - Write Example
#include <SPI.h>
#include <SD.h>

const int chipSelect = 4;

void setup() {
  Serial.begin(9600);
  
  Serial.print("Initializing SD card...");
  if (!SD.begin(chipSelect)) {
    Serial.println("Initialization failed!");
    return;
  }
  Serial.println("Initialization done.");

  // Create/Open file
  File dataFile = SD.open("test.txt", FILE_WRITE);

  if (dataFile) {
    dataFile.println("Hello, SD card! Timestamp: " + String(millis()));
    dataFile.close();
    Serial.println("Data written successfully.");
  } else {
    Serial.println("Error opening test.txt");
  }
}

void loop() {
  // Nothing to repeat here
}`,
    notes: "SD card must be formatted FAT16 or FAT32. SPI pins: Uno (11,12,13), Mega (50,51,52). Always call file.close() after writing. High-capacity SDXC or exFAT cards often will not work."
  },

  {
    id: 44,
    name: "Water Level / Raindrop Sensor",
    hasCode: true,
    arduino: `// Water Level Sensor - Basic Reading
#define SENSOR_PIN A0

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT);
  Serial.println("Water Level Sensor Initialized");
}

void loop() {
  int sensorValue = analogRead(SENSOR_PIN);

  Serial.print("Water Level Value: ");
  Serial.println(sensorValue);

  if (sensorValue > 500) {
    Serial.println("Status: High Water Level / Heavy Rain");
  } else if (sensorValue > 50) {
    Serial.println("Status: Moisture Detected / Shallow Water");
  } else {
    Serial.println("Status: Dry");
  }

  delay(500);
}`,
    notes: "Output is analog. Higher value = more water. Calibration necessary. Distilled water is non-conductive - tap/rainwater works best due to mineral content."
  },

  {
    id: 45,
    name: "MP1584EN DC-DC Buck Converter",
    hasCode: false,
    arduino: `// The MP1584EN is a hardware power module and does not use code.
// IMPORTANT: Always set the output voltage with a multimeter BEFORE
// connecting it to your Arduino or sensitive components.

/*
  Safety Check Workflow:
  1. Connect Input Power (e.g., 12V Battery) to IN+ and IN-.
  2. Use a Multimeter on the OUT+ and OUT- pins.
  3. Turn the tiny brass screw (potentiometer) until the meter reads 5.0V.
  4. Only THEN connect the OUT pins to your project.
*/`,
    notes: "N/A - This is a hardware-only module. No microcontroller code needed. Use a multimeter to set and verify output voltage before connecting to your circuit. Input: 4.5V-28V, Output: 0.8V-20V, Max current 3A."
  },

  {
    id: 46,
    name: "DC Motor (Generic)",
    hasCode: false,
    arduino: "N/A",
    notes: "Generic brushed DC motor (130/180/370 types common in Arduino kits). Requires a motor driver — never connect directly to an Arduino pin. Speed controlled via PWM, direction via an H-bridge driver. NEVER connect directly to an Arduino digital pin — motors draw 200mA+ which will damage the ATmega chip. Always add a 100nF ceramic capacitor across the motor terminals to suppress EMI."
  },

  {
    id: 47,
    name: "L298N Dual Motor Driver",
    hasCode: true,
    arduino: `// L298N Dual Motor Driver Example
#define ENA 5   // Enable Motor A (PWM)
#define IN1 8   // Motor A direction 1
#define IN2 9   // Motor A direction 2
#define IN3 10  // Motor B direction 1
#define IN4 11  // Motor B direction 2
#define ENB 6   // Enable Motor B (PWM)

void setup() {
  Serial.begin(9600);
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENB, OUTPUT);
}

void loop() {
  // Motor A: Forward at half speed
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 127);  // 50% speed

  // Motor B: Reverse at full speed
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENB, 255);  // 100% speed

  delay(2000);

  // Both motors: Brake (same direction = brake)
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, HIGH);
  delay(1000);
}`,
    notes: "Popular dual H-bridge motor driver module. Controls 2 DC motors independently (speed + direction) or 1 stepper motor. Max 2A per channel. IN1=HIGH, IN2=LOW → Motor A forward; IN1=LOW, IN2=HIGH → Motor A reverse. The L298N drops ~2V across the H-bridge. Remove the 5V jumper if supplying 5V from the Arduino."
  },

  {
    id: 48,
    name: "SG90 9g Servo Motor",
    hasCode: true,
    arduino: `// SG90 Servo Motor Example
#include <Servo.h>

#define SERVO_PIN 9

Servo myServo;

void setup() {
  Serial.begin(9600);
  myServo.attach(SERVO_PIN);
  myServo.write(90);  // Center position
}

void loop() {
  // Sweep left to right
  for (int angle = 0; angle <= 180; angle += 5) {
    myServo.write(angle);
    Serial.print("Angle: ");
    Serial.println(angle);
    delay(50);
  }

  delay(1000);

  // Sweep right to left
  for (int angle = 180; angle >= 0; angle -= 5) {
    myServo.write(angle);
    delay(50);
  }

  delay(1000);
}`,
    notes: "Micro 9g servo with 180° rotation range. Controlled by 50Hz PWM pulses. write(0) = fully left, write(90) = center, write(180) = fully right. Torque: 1.8 kg·cm, speed: 0.1s/60°. Do not power more than 1-2 servos from Arduino 5V pin — use dedicated supply. Forcing past mechanical stop strips plastic gears."
  },

  {
    id: 49,
    name: "28BYJ-48 Stepper Motor",
    hasCode: true,
    arduino: `// 28BYJ-48 Stepper Motor with ULN2003 Driver
#include <Stepper.h>

// 2048 steps per full revolution (with gearing)
#define STEPS_PER_REV 2048
#define IN1 8
#define IN2 9
#define IN3 10
#define IN4 11

Stepper stepper(STEPS_PER_REV, IN1, IN3, IN2, IN4);

void setup() {
  Serial.begin(9600);
  stepper.setSpeed(5);  // RPM - keep low for precise control
  Serial.println("28BYJ-48 Stepper Ready");
}

void loop() {
  Serial.println("Rotating clockwise 512 steps (1/4 revolution)...");
  stepper.step(512);
  delay(1000);

  Serial.println("Rotating counter-clockwise 512 steps...");
  stepper.step(-512);
  delay(1000);
}`,
    notes: "Compact 5V unipolar stepper motor with 64:1 gear reduction (2048 steps per full revolution). Low torque but very precise positioning. Almost always paired with ULN2003 driver board. Use AccelStepper library for smooth acceleration. De-energize coils when not moving (set all IN pins LOW) to reduce heat and power draw."
  },

  {
    id: 50,
    name: "ULN2003 Stepper Driver Board",
    hasCode: false,
    arduino: "N/A",
    notes: "Darlington transistor array driver board for the 28BYJ-48 stepper motor. Accepts logic-level inputs from Arduino and drives the 4 motor coils. Onboard LEDs indicate which coils are active. Direct JST connector for the 28BYJ-48. Use Arduino pins 8,9,10,11 for straightforward wiring. Onboard LEDs show active coils — very useful for debugging step sequences."
  },

  {
    id: 51,
    name: "A4988 Stepper Motor Driver",
    hasCode: true,
    arduino: `// A4988 Stepper Motor Driver Example
#define STEP_PIN 3
#define DIR_PIN 2
#define ENABLE_PIN 4

void setup() {
  Serial.begin(9600);
  pinMode(STEP_PIN, OUTPUT);
  pinMode(DIR_PIN, OUTPUT);
  pinMode(ENABLE_PIN, OUTPUT);

  digitalWrite(ENABLE_PIN, LOW);  // Enable driver
}

void loop() {
  // Forward 200 steps
  digitalWrite(DIR_PIN, HIGH);
  for (int i = 0; i < 200; i++) {
    digitalWrite(STEP_PIN, HIGH);
    delayMicroseconds(1000);
    digitalWrite(STEP_PIN, LOW);
    delayMicroseconds(1000);
  }

  delay(1000);

  // Reverse 200 steps
  digitalWrite(DIR_PIN, LOW);
  for (int i = 0; i < 200; i++) {
    digitalWrite(STEP_PIN, HIGH);
    delayMicroseconds(1000);
    digitalWrite(STEP_PIN, LOW);
    delayMicroseconds(1000);
  }

  delay(1000);
}`,
    notes: "Microstepping driver for bipolar stepper motors (NEMA 17, NEMA 23, etc). Motor: 8V–35V, up to 2A per coil. CRITICAL: Always connect a 100µF capacitor between VMOT and GND. Set current limit via onboard potentiometer BEFORE connecting motor. MS1/MS2/MS3 all HIGH = 1/16 microstepping for smoother motion."
  },

  {
    id: 52,
    name: "TB6612FNG Dual Motor Driver",
    hasCode: true,
    arduino: `// TB6612FNG Dual Motor Driver Example
#define PWMA 5   // Motor A speed
#define AIN1 8   // Motor A direction 1
#define AIN2 9   // Motor A direction 2
#define STBY 4   // Standby (must be HIGH to enable)
#define PWMB 6   // Motor B speed
#define BIN1 10  // Motor B direction 1
#define BIN2 11  // Motor B direction 2

void setup() {
  pinMode(PWMA, OUTPUT);
  pinMode(AIN1, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(STBY, OUTPUT);
  pinMode(PWMB, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);

  digitalWrite(STBY, HIGH);  // Enable driver
}

void loop() {
  // Motor A forward at 75% speed
  digitalWrite(AIN1, HIGH);
  digitalWrite(AIN2, LOW);
  analogWrite(PWMA, 192);

  // Motor B forward at 50% speed
  digitalWrite(BIN1, HIGH);
  digitalWrite(BIN2, LOW);
  analogWrite(PWMB, 127);

  delay(2000);

  // Brake (both pins high)
  digitalWrite(AIN1, HIGH);
  digitalWrite(AIN2, HIGH);
  digitalWrite(BIN1, HIGH);
  digitalWrite(BIN2, HIGH);
  delay(1000);
}`,
    notes: "High-efficiency dual H-bridge motor driver. Only 0.5V voltage drop (vs 2V for L298N), so motors receive nearly full supply voltage. Motor: 4.5V–13.5V, 1.2A continuous. STBY pin MUST be HIGH to enable outputs. AIN1=HIGH, AIN2=LOW = forward; reverse and both same = brake. Much more efficient than L298N."
  },

  {
    id: 53,
    name: "Vibration Motor Module",
    hasCode: true,
    arduino: `// Vibration Motor Module Example
#define VIBRATION_PIN 3  // PWM pin

void setup() {
  pinMode(VIBRATION_PIN, OUTPUT);
}

void loop() {
  // Vibration pulse pattern - haptic feedback
  digitalWrite(VIBRATION_PIN, HIGH);
  delay(100);
  digitalWrite(VIBRATION_PIN, LOW);
  delay(100);
  digitalWrite(VIBRATION_PIN, HIGH);
  delay(100);
  digitalWrite(VIBRATION_PIN, LOW);
  delay(500);

  delay(2000);

  // Variable intensity with PWM
  for (int intensity = 0; intensity <= 255; intensity += 10) {
    analogWrite(VIBRATION_PIN, intensity);
    delay(100);
  }

  for (int intensity = 255; intensity >= 0; intensity -= 10) {
    analogWrite(VIBRATION_PIN, intensity);
    delay(100);
  }

  delay(2000);
}`,
    notes: "Coin/disc eccentric rotating mass (ERM) vibration motor on a breakout board. Produces tactile/haptic feedback. Supply: 3V–5V. Drive via onboard transistor from Arduino PWM or digital pin. Use PWM on IN for variable intensity. Add 100nF bypass capacitor across motor terminals to suppress noise. Pulse in short bursts for longer lifespan."
  },

  {
    id: 54,
    name: "L9110S Dual Motor Driver",
    hasCode: true,
    arduino: `// L9110S Dual Motor Driver Example
#define A_1A 5   // Motor A forward (PWM)
#define A_1B 6   // Motor A reverse (PWM)
#define B_1A 9   // Motor B forward (PWM)
#define B_1B 10  // Motor B reverse (PWM)

void setup() {
  pinMode(A_1A, OUTPUT);
  pinMode(A_1B, OUTPUT);
  pinMode(B_1A, OUTPUT);
  pinMode(B_1B, OUTPUT);
}

void loop() {
  // Motor A forward, Motor B reverse
  analogWrite(A_1A, 255);  // Forward full speed
  analogWrite(A_1B, 0);
  analogWrite(B_1A, 0);
  analogWrite(B_1B, 255);  // Reverse full speed
  delay(2000);

  // Stop all
  digitalWrite(A_1A, LOW);
  digitalWrite(A_1B, LOW);
  digitalWrite(B_1A, LOW);
  digitalWrite(B_1B, LOW);
  delay(1000);

  // Both forward with variable speed
  for (int speed = 0; speed <= 255; speed += 20) {
    analogWrite(A_1A, speed);
    analogWrite(B_1A, speed);
    delay(100);
  }
  delay(1000);
}`,
    notes: "Compact dual H-bridge driver for small DC motors and fans. Motor voltage: 2.5V–12V, up to 800mA per channel. Popular in budget robot car kits. A-1A=HIGH, A-1B=LOW = Motor A forward; reverse with A-1A=LOW, A-1B=HIGH. Use analogWrite for PWM speed control. Ideal for lightweight robot cars."
  },

  {
    id: 55,
    name: "HC-05 Bluetooth Module",
    hasCode: true,
    arduino: `// HC-05 Bluetooth Module Example
#include <SoftwareSerial.h>

#define TX_PIN 10
#define RX_PIN 11

SoftwareSerial BTSerial(RX_PIN, TX_PIN);  // RX, TX

void setup() {
  Serial.begin(9600);
  BTSerial.begin(9600);  // HC-05 default baud rate
  Serial.println("HC-05 Bluetooth Ready");
}

void loop() {
  // Send data from Arduino to phone
  BTSerial.println("Hello from Arduino!");

  // Receive data from phone
  if (BTSerial.available()) {
    char data = BTSerial.read();
    Serial.print("Received: ");
    Serial.println(data);

    // Control LED based on received command
    if (data == '1') {
      digitalWrite(13, HIGH);
      BTSerial.println("LED ON");
    } else if (data == '0') {
      digitalWrite(13, LOW);
      BTSerial.println("LED OFF");
    }
  }

  delay(100);
}`,
    notes: "Classic SPP (Serial Port Profile) Bluetooth 2.0 module. Creates wireless serial link between Arduino and phone/PC. Default baud rate: 9600. Range: ~10m. RXD pin is 3.3V logic — use 1kΩ/2kΩ voltage divider to protect from 5V TX. Disconnect before uploading sketches to avoid conflicts on pins 0/1. Use SoftwareSerial on pins 10/11."
  },

  {
    id: 56,
    name: "NRF24L01+ Wireless Transceiver",
    hasCode: true,
    arduino: `// NRF24L01+ Wireless Transceiver Example
#include <RF24.h>

#define CE_PIN 7
#define CSN_PIN 8

RF24 radio(CE_PIN, CSN_PIN);
const byte address[6] = "00001";

void setup() {
  Serial.begin(9600);

  if (!radio.begin()) {
    Serial.println("NRF24 initialization failed!");
    while (1);
  }

  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_LOW);
  radio.stopListening();  // Set as transmitter
  Serial.println("NRF24L01+ Ready (Transmitter)");
}

void loop() {
  const char text[] = "Hello from NRF24";

  if (radio.write(&text, sizeof(text))) {
    Serial.println("Sent successfully!");
  } else {
    Serial.println("Send failed");
  }

  delay(1000);
}`,
    notes: "2.4GHz ISM band transceiver for peer-to-peer wireless communication. Range: up to 100m standard, 1000m with PA+LNA version. SPI interface. CRITICAL: 3.3V only — 5V will destroy instantly. Add 10–100µF cap between VCC and GND. Use RF24 library by TMRh20. Both modules must use same channel and pipe address."
  },

  {
    id: 57,
    name: "ESP8266 WiFi Module (ESP-01)",
    hasCode: true,
    arduino: `// ESP8266 AT Command Mode Example
#include <SoftwareSerial.h>

#define RX_PIN 10
#define TX_PIN 11

SoftwareSerial ESPSerial(RX_PIN, TX_PIN);  // RX, TX

void setup() {
  Serial.begin(9600);
  ESPSerial.begin(115200);  // ESP8266 default baud
  delay(1000);

  // Test AT command
  sendCommand("AT", 1000);
}

void loop() {
  if (ESPSerial.available()) {
    Serial.write(ESPSerial.read());
  }

  if (Serial.available()) {
    ESPSerial.write(Serial.read());
  }
}

void sendCommand(String cmd, const int timeout) {
  Serial.println("Sending: " + cmd);
  ESPSerial.println(cmd);

  long lastMsg = millis();
  String response = "";

  while ((millis() - lastMsg) < timeout) {
    while (ESPSerial.available()) {
      response += ESPSerial.readString();
    }
  }

  Serial.println("Response: " + response);
}`,
    notes: "Low-cost WiFi SoC with AT-command mode for Arduino co-processor use. 3.3V logic ONLY — NOT 5V tolerant. Range: 50–100m indoors. Use dedicated AMS1117-3.3 regulator (NOT Arduino 3.3V pin) with 1000µF cap. Default baud: 115200. AT+CWJAP connects to WiFi; AT+CIFSR shows IP. Can be re-flashed for standalone Arduino code."
  },

  {
    id: 58,
    name: "RFID RC522 Module",
    hasCode: true,
    arduino: `// RFID RC522 Reader Example
#include <SPI.h>
#include <MFRC522.h>

#define CS_PIN 10
#define RST_PIN 9

MFRC522 mfrc522(CS_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();

  Serial.println("RFID Reader Initialized");
  Serial.println("Place a card on the reader...");
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  Serial.print("Card UID: ");
  printHex(mfrc522.uid.uidByte, mfrc522.uid.size);
  Serial.println();

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();

  delay(1000);
}

void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? "0" : "");
    Serial.print(buffer[i], HEX);
  }
}`,
    notes: "13.56MHz RFID reader/writer (MFRC522 chipset). Reads/writes MIFARE Classic and Ultralight cards. SPI interface. Typical range: 3–5cm. Use MFRC522 library by miguelbalboa. Each card has unique 4–7 byte UID. MIFARE Classic 1K has 16 sectors with key protection. Great for access control and attendance tracking."
  },

  {
    id: 59,
    name: "OLED Display SSD1306 (128×64)",
    hasCode: true,
    arduino: `// OLED SSD1306 Display Example
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_ADDR 0x3C

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  Serial.begin(9600);

  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) {
    Serial.println("SSD1306 allocation failed");
    while (1);
  }

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("OLED Ready!");
  display.display();
  delay(2000);
}

void loop() {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 10);
  display.println("Hello OLED!");

  display.setTextSize(1);
  display.setCursor(0, 40);
  display.print("Time: ");
  display.println(millis() / 1000);

  display.display();
  delay(500);
}`,
    notes: "0.96\" monochrome OLED display, 128×64 pixels. Self-illuminating — no backlight. Extremely high contrast, wide viewing angle, low power. I2C interface (2 wires). Default I2C address: 0x3C (some use 0x3D). Always call display.clearDisplay() then draw, then display.display() for flicker-free updates. Compatible with 3.3V and 5V."
  },

  {
    id: 60,
    name: "LCD 1602 with I2C Backpack",
    hasCode: true,
    arduino: `// LCD 1602 I2C Backpack Example
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define LCD_ADDR 0x27
#define LCD_COLS 16
#define LCD_ROWS 2

LiquidCrystal_I2C lcd(LCD_ADDR, LCD_COLS, LCD_ROWS);

void setup() {
  Serial.begin(9600);

  lcd.init();
  lcd.backlight();

  lcd.setCursor(0, 0);
  lcd.print("LCD Ready!");
  lcd.setCursor(0, 1);
  lcd.print("Arduino 1602");
}

void loop() {
  static unsigned long lastUpdate = 0;

  if (millis() - lastUpdate >= 1000) {
    lastUpdate = millis();

    lcd.setCursor(0, 0);
    lcd.print("Time (s): ");
    lcd.print(millis() / 1000);
    lcd.print("    ");  // Clear trailing chars
  }

  delay(100);
}`,
    notes: "Standard 16-character × 2-line character LCD with I2C backpack (PCF8574). Reduces wiring from 6+ pins to SDA/SCL only. Backlight and contrast adjustable. Default I2C address: 0x27 (some modules use 0x3F). Use LiquidCrystal_I2C library. If screen shows blocks/garbage, adjust contrast with blue potentiometer on back."
  },

  {
    id: 61,
    name: "TM1637 4-Digit 7-Segment Display",
    hasCode: true,
    arduino: `// TM1637 4-Digit 7-Segment Display Example
#include <TM1637Display.h>

#define CLK_PIN 2
#define DIO_PIN 3

TM1637Display display(CLK_PIN, DIO_PIN);

void setup() {
  Serial.begin(9600);
  display.setBrightness(7);
}

void loop() {
  // Display counter
  static unsigned long lastUpdate = 0;
  static int counter = 0;

  if (millis() - lastUpdate >= 1000) {
    lastUpdate = millis();
    counter++;

    if (counter > 9999) {
      counter = 0;
    }

    display.showNumberDec(counter);
    Serial.println(counter);
  }

  delay(100);

  // Display time format (12:34)
  if (counter == 100) {
    display.showNumberDecEx(1234, 0b01000000);  // Colon separator
  }
}`,
    notes: "4-digit 7-segment LED display driven by TM1637 chip over simple 2-wire protocol. Common anode. Displays digits 0–9 and some letters. Built-in colon separator ideal for clock displays. Brightness adjustable in 8 levels. Use TM1637Display library. display.showNumberDecEx(1230, 0b01000000) shows '12:30' format."
  },

  {
    id: 62,
    name: "MAX7219 8×8 LED Matrix",
    hasCode: true,
    arduino: `// MAX7219 8×8 LED Matrix Example
#include <LedControl.h>

#define DIN_PIN 11
#define CLK_PIN 13
#define CS_PIN 10

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);  // 1 module

void setup() {
  lc.shutdown(0, false);      // Wake up
  lc.setIntensity(0, 8);      // Brightness
  lc.clearDisplay(0);         // Clear
}

void loop() {
  // Draw a simple pattern
  byte pattern[8] = {
    B10000001,
    B01000010,
    B00100100,
    B00011000,
    B00011000,
    B00100100,
    B01000010,
    B10000001
  };

  for (int row = 0; row < 8; row++) {
    lc.setRow(0, row, pattern[row]);
  }

  delay(2000);
  lc.clearDisplay(0);
  delay(1000);
}`,
    notes: "8×8 LED dot matrix display driven by MAX7219 SPI LED driver. Chainable — multiple modules share same 3 Arduino pins. Individual LED control and 16-level brightness. Used for scrolling text, animations, and games. Add 100µF electrolytic + 100nF ceramic capacitors between VCC/GND near module. Daisy-chain: DOUT of first → DIN of second, shared CS/CLK."
  },

  {
    id: 63,
    name: "WS2812B NeoPixel LED Strip",
    hasCode: true,
    arduino: `// WS2812B NeoPixel LED Strip Example
#include <FastLED.h>

#define DATA_PIN 6
#define NUM_LEDS 30

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(9600);
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(50);  // Safe prototyping brightness
}

void loop() {
  // Rainbow effect
  static uint8_t hue = 0;

  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CHSV(hue + (i * 256 / NUM_LEDS), 255, 255);
  }

  FastLED.show();
  hue++;
  delay(20);

  // Red blink
  if (hue == 256) {
    fill_solid(leds, NUM_LEDS, CRGB::Red);
    FastLED.show();
    delay(500);

    fill_solid(leds, NUM_LEDS, CRGB::Black);
    FastLED.show();
    delay(500);
  }
}`,
    notes: "Individually addressable RGB LEDs. Each LED contains WS2812B driver — independent full-color control over single data wire. ~60mA per LED at full white. Available in 30/60/144 LEDs per metre. Add 300–500Ω series resistor on data line. High current — 1m of 60 LEDs at full white draws 3.6A. Use FastLED or Adafruit NeoPixel library. Use setBrightness(50) for safe prototyping."
  },

  {
    id: 64,
    name: "BMP280 Barometric Pressure Sensor",
    hasCode: true,
    arduino: `// BMP280 Barometric Pressure Sensor Example
#include <Adafruit_BMP280.h>
#include <Wire.h>

Adafruit_BMP280 bmp;

void setup() {
  Serial.begin(9600);

  if (!bmp.begin(0x76)) {
    Serial.println("BMP280 not found!");
    while (1);
  }

  // Set sampling options
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,
                  Adafruit_BMP280::SAMPLING_X2,
                  Adafruit_BMP280::SAMPLING_X16,
                  Adafruit_BMP280::FILTER_X16,
                  Adafruit_BMP280::STANDBY_MS_500);
}

void loop() {
  Serial.print("Temperature: ");
  Serial.print(bmp.readTemperature());
  Serial.println(" °C");

  Serial.print("Pressure: ");
  Serial.print(bmp.readPressure());
  Serial.println(" Pa");

  Serial.print("Altitude: ");
  Serial.print(bmp.readAltitude(1013.25));  // Adjust for local sea-level pressure
  Serial.println(" m");

  Serial.println();
  delay(2000);
}`,
    notes: "Digital barometric pressure and temperature sensor. Pressure accuracy ±1 hPa, temperature ±1°C. I2C or SPI interface. Can calculate altitude from pressure. Range: 300–1100 hPa (±9000m altitude). Use Adafruit_BMP280 library. SDO to GND = 0x76 (default); SDO to VCC = 0x77 for second device. Place away from heat sources for accurate temperature."
  },

  {
    id: 65,
    name: "BME280 Environmental Sensor",
    hasCode: true,
    arduino: `// BME280 Temperature, Humidity, Pressure Sensor
#include <Adafruit_BME280.h>
#include <Wire.h>

Adafruit_BME280 bme;

void setup() {
  Serial.begin(9600);

  if (!bme.begin(0x76)) {
    Serial.println("BME280 not found!");
    while (1);
  }

  Serial.println("BME280 Initialized");
}

void loop() {
  Serial.print("Temperature: ");
  Serial.print(bme.readTemperature());
  Serial.println(" °C");

  Serial.print("Humidity: ");
  Serial.print(bme.readHumidity());
  Serial.println(" %");

  Serial.print("Pressure: ");
  Serial.print(bme.readPressure() / 100.0);
  Serial.println(" hPa");

  Serial.print("Altitude: ");
  Serial.print(bme.readAltitude(1013.25));
  Serial.println(" m");

  Serial.println();
  delay(2000);
}`,
    notes: "All-in-one temperature, humidity, and barometric pressure sensor. Adds ±3% RH humidity over BMP280. I2C or SPI interface. Range: -40°C to +85°C, 0–100% RH, 300–1100 hPa. Default I2C address: 0x76. Use Adafruit_BME280 library. Avoid breathing on sensor — moisture from breath skews humidity. Use forced mode for weather stations to minimize self-heating errors."
  },

  {
    id: 66,
    name: "VL53L0X Laser Distance Sensor",
    hasCode: true,
    arduino: `// VL53L0X Laser Time-of-Flight Distance Sensor
#include <Adafruit_VL53L0X.h>
#include <Wire.h>

Adafruit_VL53L0X lox = Adafruit_VL53L0X();

void setup() {
  Serial.begin(9600);

  if (!lox.begin()) {
    Serial.println("Failed to boot VL53L0X");
    while (1);
  }

  Serial.println("VL53L0X Ready");
}

void loop() {
  VL53L0X_RangingMeasurementData_t measure;

  lox.rangingTest(&measure, false);

  if (measure.RangeStatus != 4) {
    Serial.print("Distance (mm): ");
    Serial.println(measure.RangeMilliMeter);
  } else {
    Serial.println("Out of range");
  }

  delay(100);
}`,
    notes: "Time-of-Flight laser ranging sensor using 940nm VCSEL laser. Range: 30–2000mm, accuracy ±3%. Works on nearly any surface color. I2C interface. Default address: 0x29. Use XSHUT pin to power-cycle and reassign address for multiple sensors. Much more consistent than triangulation-based IR sensors. Accuracy degrades in direct sunlight or with mirror-like surfaces."
  },

  {
    id: 67,
    name: "PIR Motion Sensor (HC-SR501)",
    hasCode: true,
    arduino: `// PIR Motion Sensor HC-SR501 Example
#define PIR_PIN 2
#define LED_PIN 13

void setup() {
  Serial.begin(9600);
  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  // Allow 30-60 second warm-up
  Serial.println("Warming up PIR sensor...");
  for (int i = 30; i > 0; i--) {
    Serial.print(i);
    Serial.println(" seconds remaining");
    delay(1000);
  }
  Serial.println("PIR Ready!");
}

void loop() {
  if (digitalRead(PIR_PIN) == HIGH) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Motion detected!");
  } else {
    digitalWrite(LED_PIN, LOW);
    Serial.println("No motion");
  }

  delay(500);
}`,
    notes: "Passive Infrared motion detector. Senses IR radiation changes from warm moving bodies. Digital output HIGH for adjustable hold time (3s–5min) when motion detected. Range: up to 7m. Supply: 5V–20V. Allow 30–60 second warm-up after power-on. Two potentiometers: sensitivity (range) and time delay. Jumper H = repeat-trigger mode; L = single pulse."
  },

  {
    id: 68,
    name: "MQ-2 Gas & Smoke Sensor",
    hasCode: true,
    arduino: `// MQ-2 Gas and Smoke Sensor Example
#define MQ2_ANALOG A0
#define MQ2_DIGITAL 2
#define BUZZER_PIN 3

void setup() {
  Serial.begin(9600);
  pinMode(MQ2_DIGITAL, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  Serial.println("MQ-2 Sensor - Preheating...");
  delay(20000);  // 20 second preheat minimum
}

void loop() {
  int analogValue = analogRead(MQ2_ANALOG);
  int digitalValue = digitalRead(MQ2_DIGITAL);

  Serial.print("Analog: ");
  Serial.print(analogValue);
  Serial.print(" | Digital: ");
  Serial.println(digitalValue);

  if (digitalValue == HIGH) {
    Serial.println("Gas/Smoke Detected!");
    tone(BUZZER_PIN, 1000);
  } else {
    noTone(BUZZER_PIN);
  }

  delay(500);
}`,
    notes: "Semiconductor gas sensor sensitive to LPG, propane, methane, hydrogen, smoke, and alcohol vapour. Analog and digital outputs. Heater coil consumes ~900mW and gets hot. Requires 20–48 hour pre-heat for stable baseline on new sensors. Adjust threshold with onboard potentiometer. Readings are non-specific — use for detection, not precise PPM without calibration."
  },

  {
    id: 69,
    name: "MQ-135 Air Quality Sensor",
    hasCode: true,
    arduino: `// MQ-135 Air Quality Sensor Example
#define MQ135_ANALOG A0
#define MQ135_DIGITAL 2

void setup() {
  Serial.begin(9600);
  pinMode(MQ135_DIGITAL, INPUT);

  Serial.println("MQ-135 Air Quality Sensor");
  Serial.println("Preheating for 20 seconds...");
  delay(20000);
}

void loop() {
  int sensorValue = analogRead(MQ135_ANALOG);
  int digitalValue = digitalRead(MQ135_DIGITAL);

  Serial.print("Air Quality: ");
  Serial.print(sensorValue);
  Serial.print(" | Threshold: ");
  Serial.println(digitalValue);

  if (digitalValue == HIGH) {
    Serial.println("Poor Air Quality Detected");
  } else {
    Serial.println("Air Quality Normal");
  }

  delay(1000);
}`,
    notes: "Semiconductor sensor sensitive to NH3, NOx, alcohol, benzene, CO2, and smoke. Used as general indoor air quality indicator. Analog and digital outputs. Same heater requirements as MQ-2. Allow 20-minute minimum warm-up; 24–48 hours for stable new-sensor baseline. MQ135 library estimates PPM with RZERO calibration. Best for relative air quality trending, not absolute values."
  },

  {
    id: 70,
    name: "APDS-9960 Gesture & Proximity Sensor",
    hasCode: true,
    arduino: `// APDS-9960 Gesture and Proximity Sensor
#include <SparkFun_APDS9960.h>
#include <Wire.h>

SparkFun_APDS9960 apds = SparkFun_APDS9960();

void setup() {
  Serial.begin(9600);

  if (!apds.begin()) {
    Serial.println("APDS-9960 not found!");
    while (1);
  }

  apds.enableGestureSensor(false);
  Serial.println("APDS-9960 Ready");
}

void loop() {
  uint8_t proximity = apds.readProximity();

  Serial.print("Proximity: ");
  Serial.println(proximity);

  if (proximity < 20) {
    Serial.println("Object detected nearby!");
  }

  delay(500);
}`,
    notes: "Integrated sensor providing gesture recognition (up/down/left/right/near/far), proximity detection (0–20cm), ambient light, and RGBA color sensing over I2C. Low power. Fixed I2C address: 0x39. Wire INT to pin 2/3 for interrupt-driven detection. Gesture mode works best in low ambient light. Great for contactless UI — swipe to navigate menus."
  },

  {
    id: 71,
    name: "HMC5883L Digital Compass",
    hasCode: true,
    arduino: `// HMC5883L Digital Compass Example
#include <Wire.h>
#include <HMC5883L.h>

HMC5883L compass;

void setup() {
  Serial.begin(9600);

  compass.init();
  compass.setRange(HMC5883L_RANGE_1_3GA);
  compass.setMeasurementMode(HMC5883L_CONTINOUS);

  Serial.println("HMC5883L Compass Ready");
}

void loop() {
  Vector norm = compass.readNormalize();

  float heading = atan2(norm.YAxis, norm.XAxis);

  // Add magnetic declination (varies by location)
  // Example: -10° for some locations
  heading += (10 * PI / 180);  // Add 10 degrees

  if (heading < 0) heading += 2 * PI;
  if (heading > 2 * PI) heading -= 2 * PI;

  float headingDegrees = heading * (180 / PI);

  Serial.print("Heading: ");
  Serial.print(headingDegrees);
  Serial.println(" degrees");

  delay(500);
}`,
    notes: "3-axis digital magnetometer measuring Earth's magnetic field for heading and orientation. Resolution: 2 milligauss. I2C interface (address 0x1E). Range: ±8 gauss. Note: many modules use QMC5883L clone with different address. Heading = atan2(y, x) × (180 / PI) + magnetic declination. Keep away from motors/speakers/ferrous metals. Calibrate by rotating through all axes."
  },

  {
    id: 72,
    name: "ACS712 Current Sensor",
    hasCode: true,
    arduino: `// ACS712 Current Sensor Example (5A variant)
#define ACS712_PIN A0

void setup() {
  Serial.begin(9600);
  pinMode(ACS712_PIN, INPUT);

  Serial.println("ACS712 Current Sensor");
  Serial.println("5A Variant: 185 mV/A");
}

void loop() {
  // Average 500 samples for noise reduction
  long sum = 0;
  for (int i = 0; i < 500; i++) {
    sum += analogRead(ACS712_PIN);
    delayMicroseconds(200);
  }

  float voltage = (sum / 500.0) * (5.0 / 1023.0);
  float current = (voltage - 2.5) / 0.185;  // 185 mV/A, 2.5V = 0A

  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.print("V | Current: ");
  Serial.print(current);
  Serial.println("A");

  delay(1000);
}`,
    notes: "Hall-effect linear current sensor. Measures both AC and DC current without breaking circuit. Available in 5A (185mV/A), 20A (100mV/A), 30A (66mV/A). Analog output centered at VCC/2 (2.5V at 5V supply). Average 500+ samples to reduce noise. Offset varies slightly — calibrate with no current flowing. For AC RMS, sample many cycles and calculate sqrt(mean(sample²))."
  },

  {
    id: 73,
    name: "INA219 High-Side Power Monitor",
    hasCode: true,
    arduino: `// INA219 Power Monitor Example
#include <Adafruit_INA219.h>
#include <Wire.h>

Adafruit_INA219 ina219;

void setup() {
  Serial.begin(9600);

  if (!ina219.begin()) {
    Serial.println("Failed to find INA219 chip");
    while (1);
  }

  Serial.println("INA219 Power Monitor Ready");
}

void loop() {
  float busVoltage = ina219.getBusVoltage_V();
  float current_mA = ina219.getCurrent_mA();
  float power_mW = ina219.getPower_mW();

  Serial.print("Bus Voltage: ");
  Serial.print(busVoltage);
  Serial.print("V | Current: ");
  Serial.print(current_mA);
  Serial.print("mA | Power: ");
  Serial.print(power_mW);
  Serial.println("mW");

  delay(1000);
}`,
    notes: "I2C power monitor measuring bus voltage (0–26V), shunt voltage, current, and calculated power. 12-bit ADC. Requires 0.1Ω shunt resistor (included on most modules). Max 3.2A with onboard shunt. 4 configurable I2C addresses (0x40–0x43) via A0/A1 pins. Use Adafruit_INA219 library. VIN+/VIN- path carries load current — ensure proper wire gauge."
  },

  {
    id: 74,
    name: "Sharp GP2Y0A21 IR Distance Sensor",
    hasCode: true,
    arduino: `// Sharp GP2Y0A21 IR Distance Sensor Example
#define IR_PIN A0

void setup() {
  Serial.begin(9600);
  pinMode(IR_PIN, INPUT);
}

void loop() {
  int rawValue = analogRead(IR_PIN);
  float voltage = rawValue * (5.0 / 1023.0);

  // Sharp formula: distance(cm) = 29.988 × pow(voltage, -1.173)
  float distance = 29.988 * pow(voltage, -1.173);

  Serial.print("Raw: ");
  Serial.print(rawValue);
  Serial.print(" | Voltage: ");
  Serial.print(voltage);
  Serial.print("V | Distance: ");
  Serial.print(distance);
  Serial.println("cm");

  delay(100);
}`,
    notes: "Analog infrared distance sensor using triangulation. Range: 10–80cm. Analog output voltage inversely proportional to distance. Works on most surfaces regardless of color. Fast 38ms response time. Add 10µF electrolytic capacitor between VCC/GND close to sensor. Objects closer than 10cm give unreliable readings. Output is non-linear — use Sharp formula or table from datasheet."
  },

  {
    id: 75,
    name: "MAX30102 Pulse Oximeter & Heart Rate",
    hasCode: true,
    arduino: `// MAX30102 Pulse Oximeter and Heart Rate
#include <MAX30105.h>
#include <heartRate.h>
#include <Wire.h>

MAX30105 particleSensor;

void setup() {
  Serial.begin(9600);

  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 not found!");
    while (1);
  }

  particleSensor.setup();
  particleSensor.setPulseAmplitudeRed(0x0A);

  Serial.println("MAX30102 Ready - Place finger on sensor");
}

void loop() {
  uint32_t irValue = particleSensor.getIR();

  if (irValue < 50000) {
    Serial.println("No finger detected");
  } else {
    Serial.print("IR: ");
    Serial.println(irValue);
  }

  delay(100);
}`,
    notes: "Integrated optical sensor with red (660nm) and IR (880nm) LEDs plus photodetector. Measures heart rate (BPM) and blood oxygen saturation (SpO2). I2C interface (address 0x57). Ultra-low power. FOR EDUCATIONAL/HOBBY USE ONLY — not a medical device. Place fingertip gently — too much pressure cuts off blood flow. Shield from ambient light with dark enclosure. Warm up 5–10 seconds before reading."
  },

  {
    id: 76,
    name: "IRF520 MOSFET Driver Module",
    hasCode: true,
    arduino: `// IRF520 MOSFET Driver Example
#define MOSFET_PIN 3  // PWM pin

void setup() {
  pinMode(MOSFET_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // PWM dimming/speed control
  for (int pwm = 0; pwm <= 255; pwm += 10) {
    analogWrite(MOSFET_PIN, pwm);
    Serial.println(pwm);
    delay(500);
  }

  delay(1000);

  // On/off control
  digitalWrite(MOSFET_PIN, HIGH);
  Serial.println("Load ON");
  delay(2000);

  digitalWrite(MOSFET_PIN, LOW);
  Serial.println("Load OFF");
  delay(2000);
}`,
    notes: "N-channel MOSFET (IRF520) driver for switching high-power DC loads. Gate driven from Arduino PWM or digital output. Controls LED strips, motors, heaters, fans. Continuous load: up to 9A. PWM gives speed/brightness control. IRF520 only partially enhanced at 5V — for better efficiency above 3A, use IRLZ44N (better logic-level). Ensure load GND connected to Arduino GND."
  },

  {
    id: 77,
    name: "XL6009 DC-DC Boost Converter",
    hasCode: false,
    arduino: "N/A",
    notes: "Adjustable step-up switching regulator. Converts lower input voltage to higher output voltage. Input: 3.3V–32V, Output: 5V–35V (must exceed input). Up to 4A output. ~94% efficiency. Used to run 12V systems from 5V or LiPo batteries. Output must always be higher than input — equal voltages may cause overheating. Always set and verify output voltage with multimeter before connecting loads. Turn potentiometer clockwise to increase voltage."
  },

  {
    id: 78,
    name: "AT24C256 I2C EEPROM",
    hasCode: true,
    arduino: `// AT24C256 I2C EEPROM Example
#include <Wire.h>

#define EEPROM_ADDR 0x50

void setup() {
  Serial.begin(9600);
  Wire.begin();

  // Write byte to address 0
  writeEEPROM(0, 123);

  // Read byte from address 0
  byte value = readEEPROM(0);
  Serial.print("Read value: ");
  Serial.println(value);
}

void loop() {
  delay(1000);
}

void writeEEPROM(int addr, byte val) {
  Wire.beginTransmission(EEPROM_ADDR);
  Wire.write((addr >> 8) & 0xFF);
  Wire.write(addr & 0xFF);
  Wire.write(val);
  Wire.endTransmission();
  delay(5);  // Wait for write cycle
}

byte readEEPROM(int addr) {
  Wire.beginTransmission(EEPROM_ADDR);
  Wire.write((addr >> 8) & 0xFF);
  Wire.write(addr & 0xFF);
  Wire.endTransmission();

  Wire.requestFrom(EEPROM_ADDR, 1);
  return Wire.read();
}`,
    notes: "32KB (256Kbit) non-volatile I2C EEPROM. Retains data without power. Byte or 64-byte page write modes. Endurance: 1,000,000 write cycles. Retention: 100 years. Address pins A0–A2 allow 8 devices (0x50–0x57). Write Protect pin (WP). Use extEEPROM library for convenience. Page write (64 bytes) much faster than byte-by-byte. Wait 5ms after write for internal cycle."
  },

  {
    id: 79,
    name: "SIM800L GSM/GPRS Module",
    hasCode: true,
    arduino: `// SIM800L GSM/GPRS Module Example
#include <SoftwareSerial.h>

#define RX_PIN 10
#define TX_PIN 11

SoftwareSerial sim800Serial(RX_PIN, TX_PIN);

void setup() {
  Serial.begin(9600);
  sim800Serial.begin(9600);
  delay(1000);

  // Check module
  sendCommand("AT", 1000);

  // Check signal
  sendCommand("AT+CSQ", 1000);
}

void loop() {
  if (sim800Serial.available()) {
    Serial.write(sim800Serial.read());
  }

  if (Serial.available()) {
    sim800Serial.write(Serial.read());
  }
}

void sendCommand(String cmd, const int timeout) {
  sim800Serial.println(cmd);
  long lastMsg = millis();

  while ((millis() - lastMsg) < timeout) {
    while (sim800Serial.available()) {
      Serial.write(sim800Serial.read());
    }
  }
  Serial.println();
}`,
    notes: "Quad-band GSM/GPRS module for SMS, voice calls, and 2G data. Controlled via AT commands over UART. Requires micro SIM card. Operating voltage: 3.4V–4.4V — NOT Arduino 5V or 3.3V pins. Requires dedicated 2A capable supply. NEVER power from Arduino pins — 2A+ TX will brown-out. RXD is 3.3V logic — use voltage divider from Arduino TX. LED blink: rapid = searching, every 3s = registered."
  },

  {
    id: 80,
    name: "74HC595 8-Bit Shift Register",
    hasCode: true,
    arduino: `// 74HC595 Shift Register Example
#define DATA_PIN 11
#define CLOCK_PIN 13
#define LATCH_PIN 10

void setup() {
  pinMode(DATA_PIN, OUTPUT);
  pinMode(CLOCK_PIN, OUTPUT);
  pinMode(LATCH_PIN, OUTPUT);
}

void loop() {
  // Count 0-255
  for (int i = 0; i < 256; i++) {
    digitalWrite(LATCH_PIN, LOW);
    shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, i);
    digitalWrite(LATCH_PIN, HIGH);
    delay(100);
  }
}

void shiftOut(int dataPin, int clockPin, int bitOrder, byte val) {
  for (int i = 0; i < 8; i++) {
    if (bitOrder == LSBFIRST) {
      digitalWrite(dataPin, val & 1);
      val >>= 1;
    } else {
      digitalWrite(dataPin, (val & 128) != 0);
      val <<= 1;
    }

    digitalWrite(clockPin, HIGH);
    delayMicroseconds(1);
    digitalWrite(clockPin, LOW);
    delayMicroseconds(1);
  }
}`,
    notes: "8-bit serial-in, parallel-out shift register. Expands 3 Arduino pins into 8 digital outputs. Chainable for 64+ outputs. Each output can sink/source 35mA. Used for LED banks, multiplexed displays, GPIO expansion. Daisy chain: Q7S of first → DS of second; share SHCP/STCP. Pull STCP LOW, shiftOut(), then HIGH to update outputs. Use Arduino shiftOut() function."
  },

  {
    id: 81,
    name: "PCF8574 I2C GPIO Expander",
    hasCode: true,
    arduino: `// PCF8574 I2C GPIO Expander Example
#include <Wire.h>
#include <PCF8574.h>

#define PCF8574_ADDR 0x20

PCF8574 pcf8574(PCF8574_ADDR);

void setup() {
  Serial.begin(9600);
  Wire.begin();
  pcf8574.init();

  Serial.println("PCF8574 Ready");
}

void loop() {
  // Write all pins HIGH
  pcf8574.write(0xFF);
  delay(1000);

  // Write all pins LOW
  pcf8574.write(0x00);
  delay(1000);

  // Read pins
  uint8_t value = pcf8574.read();
  Serial.print("Pin states: 0x");
  Serial.println(value, HEX);
}`,
    notes: "8-bit I2C GPIO expander. Adds 8 bidirectional I/O pins with just 2 wires. Address configurable via A0–A2 (0x20–0x27) — up to 8 chips (64 pins) on one bus. 25mA sink current per pin. For inputs, write 0xFF first to set weak pull-up. PCF8574 library by Rob Tillaart gives convenient individual pin control. Used in LCD backpacks, relay banks, button matrices."
  },

  {
    id: 82,
    name: "MCP3208 12-Bit SPI ADC",
    hasCode: true,
    arduino: `// MCP3208 12-Bit ADC Example
#include <SPI.h>

#define CS_PIN 10

void setup() {
  Serial.begin(9600);
  SPI.begin();
  pinMode(CS_PIN, OUTPUT);
  digitalWrite(CS_PIN, HIGH);
}

void loop() {
  // Read channel 0
  uint16_t value = readADC(0);

  Serial.print("Channel 0: ");
  Serial.print(value);
  Serial.print(" (");
  float voltage = (value / 4095.0) * 5.0;
  Serial.print(voltage);
  Serial.println("V)");

  delay(500);
}

uint16_t readADC(byte channel) {
  byte configByte = 0x06 | (channel >> 2);
  byte dataByte = (channel & 0x03) << 6;

  digitalWrite(CS_PIN, LOW);

  SPI.transfer(configByte);
  byte high = SPI.transfer(dataByte);
  byte low = SPI.transfer(0x00);

  digitalWrite(CS_PIN, HIGH);

  return ((high & 0x0F) << 8) | low;
}`,
    notes: "8-channel 12-bit Analog-to-Digital Converter with SPI interface. Provides 8 single-ended or 4 differential channels with 4096-step resolution (vs Arduino's 1024-step 10-bit). Better noise performance than onboard ADC. Supply: 2.7V–5.5V. Connect VREF to 3.3V if reading 3.3V sensors for best precision. Much lower noise floor than analogRead()."
  },

  {
    id: 83,
    name: "Logic Level Converter (BSS138)",
    hasCode: false,
    arduino: "N/A",
    notes: "Bidirectional 4-channel logic level converter using BSS138 N-channel MOSFETs. Safely interfaces 3.3V and 5V devices. No direction configuration needed — works bidirectionally. Essential for connecting NRF24L01, RFID, OLED, and other 3.3V modules to 5V Arduino. Connect LV to Arduino 3.3V pin and HV to 5V pin. One module handles 4 bidirectional lines. Works for I2C, SPI, UART. NOT suitable for SPI above ~4 MHz."
  },

  {
    id: 84,
    name: "TTP223 Capacitive Touch Sensor",
    hasCode: true,
    arduino: `// TTP223 Capacitive Touch Sensor Example
#define TOUCH_PIN 2
#define LED_PIN 13

void setup() {
  Serial.begin(9600);
  pinMode(TOUCH_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  Serial.println("TTP223 Touch Sensor Ready");
  Serial.println("Do not touch sensor during first 0.5 seconds (calibration)");
}

void loop() {
  if (digitalRead(TOUCH_PIN) == HIGH) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Touch detected!");
    delay(100);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
}`,
    notes: "Single-channel self-calibrating capacitive touch sensor. Detects finger proximity without physical pressure. Toggle or momentary output mode (solder pad configurable). Active HIGH output by default. Supply: 2V–5.5V. No debouncing needed — output is clean digital signal. Sensor works through glass, plastic, and wood. Do NOT touch during first 0.5s after power-up (self-calibration)."
  },

  {
    id: 85,
    name: "PCA9685 16-Channel PWM/Servo Driver",
    hasCode: true,
    arduino: `// PCA9685 16-Channel PWM/Servo Driver Example
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x40);

#define SERVOMIN 150
#define SERVOMAX 600
#define USMIN 600
#define USMAX 2400

void setup() {
  Serial.begin(9600);
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(50);  // 50Hz for servos

  Serial.println("PCA9685 Ready");
}

void loop() {
  // Sweep servo on channel 0 from 0 to 180 degrees
  for (uint16_t pulselen = SERVOMIN; pulselen < SERVOMAX; pulselen++) {
    pwm.setPWM(0, 0, pulselen);
    delay(10);
  }

  delay(500);

  // Sweep back
  for (uint16_t pulselen = SERVOMAX; pulselen > SERVOMIN; pulselen--) {
    pwm.setPWM(0, 0, pulselen);
    delay(10);
  }

  delay(500);
}`,
    notes: "I2C-controlled 16-channel 12-bit PWM driver. Each channel independently adjustable from 0–4096 duty cycle steps at 24–1526 Hz. Perfect for driving up to 16 servos (external 5V rail), PWM LED dimming, or motor speed control. 64 configurable I2C addresses (0x40–0x7F). Always power servo rail from dedicated 5V 3A+ supply. 50Hz servo pulse: pulse = map(angle, 0, 180, 150, 600)."
  }
];

// Export for use in main website
if (typeof module !== 'undefined') {
  module.exports = componentExamples;
}
