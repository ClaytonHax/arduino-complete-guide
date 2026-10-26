// Arduino 37-in-1 Sensor Kit Data
const sensorsData = [
    {
        id: 1,
        name: "Joystick",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/512-00.jpg",
        category: "input",
        description: "An analog dual-axis potentiometer-based joystick module with integrated push-button functionality. Contains two 10kΩ potentiometers that detect left/right (X-axis) and up/down (Y-axis) movement. The joystick returns analog values from 0-1023 on each axis, with center position at approximately 512. The integrated push button is active-LOW and can trigger additional actions. Ideal for game controllers, robot navigation systems, menu interfaces, and any application requiring proportional directional control. Commonly used in robotics projects for real-time motion control with analog precision. The module sits proudly on a small PCB with onboard pull-up resistors built-in. Perfect for learning analog input handling in Arduino projects.",
        voltage: "5V",
        pins: [
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "+5V", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "VRx", connection: "Analog", description: "X-axis analog output (A0-A5)" },
            { name: "VRy", connection: "Analog", description: "Y-axis analog output (A0-A5)" },
            { name: "SW", connection: "Digital", description: "Button digital input (any digital pin)" }
        ],
        tags: ["analog", "input", "2-axis", "button"],
        code: {
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
        tips: [
            "Calibrate center position by reading values when joystick is at rest",
            "Add deadzone for center position to avoid drift",
            "Use map() function to convert 0-1023 range to your desired range"
        ]
    },
    {
        id: 2,
        name: "Relay Module",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2895-00.jpg",
        category: "output",
        description: "A single-channel electromagnetic relay module designed for switching high-power loads that cannot be controlled directly by Arduino pins. Rated for up to 10 Amperes at 250 volts AC or 10 Amperes at 30 volts DC, making it suitable for controlling household appliances, industrial equipment, lighting systems, and motors. The module contains an optoisolated relay circuit with a single control pin (S) that accepts a logic signal from Arduino. Send HIGH to activate the relay, LOW to deactivate. Features onboard LED indicator showing relay state. This isolation protects your Arduino from back-EMF and voltage spikes that occur when switching inductive loads. Essential for any project requiring electrical isolation between low-voltage control circuitry and high-power AC/DC devices. Used extensively in home automation, irrigation systems, and industrial control applications.",
        voltage: "5V",
        pins: [
            { name: "S", connection: "Digital", description: "Signal input - HIGH to activate relay" },
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" }
        ],
        tags: ["relay", "switch", "high-power", "output"],
        code: {
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
        warnings: [
            "DANGER: High voltage! Do not touch relay contacts when connected to mains power",
            "Ensure proper wire gauge for the current rating",
            "Add snubber circuit for inductive loads to protect relay contacts"
        ],
        tips: [
            "Relay clicks when switching - this is normal",
            "For AC loads, use proper fusing and circuit breakers",
            "Consider using optoisolation for safety with high voltage"
        ]
    },
    {
        id: 3,
        name: "Big Sound",
        imageUrl: "",
        category: "sensor",
        description: "High-sensitivity sound/noise detection module featuring a large-diameter electret microphone capsule coupled with an onboard amplifier circuit. Provides both analog and digital outputs for flexible sound detection and measurement applications. The analog output (AO) returns values proportional to the instantaneous sound pressure level, allowing you to measure sound intensity. The digital output (DO) provides a binary trigger when sound exceeds a user-adjustable threshold set via the onboard potentiometer. Commonly used for clap-activated switches, sound-level monitoring, volume-responsive lighting, and robot obstacle-avoidance via acoustic signals. The larger capsule compared to the Small Sound sensor offers superior sensitivity and lower noise floor, though it picks up more ambient background noise. Excellent for educational projects demonstrating signal processing and threshold detection.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DO", connection: "Digital", description: "Digital output - HIGH when sound exceeds threshold" },
            { name: "AO", connection: "Analog", description: "Analog output - proportional to sound level" }
        ],
        tags: ["microphone", "sound", "sensor", "analog", "digital"],
        code: {
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
        tips: [
            "Use analog output for measuring sound levels",
            "Use digital output for simple sound detection (clap switch, etc.)",
            "Position away from mechanical vibrations for best results"
        ]
    },
    {
        id: 4,
        name: "Small Sound",
        imageUrl: "",
        category: "sensor",
        description: "Compact sound detection module featuring a smaller-diameter electret microphone capsule optimized for close-range noise detection and clap/knock recognition. Provides identical analog and digital output pins as the Big Sound module, but with reduced sensitivity and better noise rejection due to the smaller capture area. The reduced sensitivity means it's less likely to trigger false positives from distant background noise, making it ideal for hand-clap detection and local sound events. Perfect for implementing clap-activated circuit breakers, touch-less controls, and robotic systems that respond to specific acoustic signals. The digital threshold output allows simple on/off triggering via the adjustable potentiometer on the module's PCB. When you need reliable, localized sound detection without cross-talk from ambient environmental noise, this module is superior to the Big Sound variant.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DO", connection: "Digital", description: "Digital output - HIGH when sound exceeds threshold" },
            { name: "AO", connection: "Analog", description: "Analog output - proportional to sound level" }
        ],
        tags: ["microphone", "sound", "sensor", "analog", "digital"],
        code: {
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
        tips: [
            "Perfect for clap-activated switches",
            "Less prone to background noise than Big Sound module",
            "Adjust sensitivity pot for your specific use case"
        ]
    },
    {
        id: 5,
        name: "Tracking Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2168-00.jpg",
        category: "sensor",
        description: "Infrared reflection-based obstacle and line-detection sensor optimized for short-range detection up to approximately 1 centimeter away. Consists of an IR LED emitter paired with a photodiode receiver on the same module. When the IR beam bounces off a surface (especially dark/black surfaces that absorb light), the sensor detects the reduction in reflected light and outputs an active-LOW digital signal. Primarily used for line-following robots where the sensor mounted below the chassis tracks a black line on a white surface. Multiple sensors arranged in a row enable directional sensing for automated path correction. The output is digital (no analog value), making it straightforward to interface with Arduino digital inputs. Extremely low-cost solution for robotic navigation and industrial line-tracking applications. Very short detection range means it's ideal for precise surface-following but not suitable for general obstacle avoidance at distance.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "OUT", connection: "Digital", description: "Digital output - LOW when object detected" }
        ],
        tags: ["IR", "line-following", "obstacle", "sensor"],
        code: {
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
        tips: [
            "Black surfaces absorb IR - sensor detects them (LOW)",
            "White surfaces reflect IR - sensor doesn't detect (HIGH)",
            "Use 2-3 sensors for robust line following",
            "Keep sensor 3-10mm above the surface"
        ]
    },
    {
        id: 6,
        name: "Avoid Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/165-00.jpg",
        category: "sensor",
        description: "Infrared reflection-based obstacle avoidance sensor with variable detection range up to approximately 7 centimeters, making it ideal for robot collision detection and general proximity sensing. Unlike the Tracking Sensor which detects at very close range, this module has adjustable sensitivity via an onboard potentiometer, allowing you to tune the detection distance for your specific environment and surface reflectivity. Features an Enable (EN) pin for power management—pull this pin LOW to disable the sensor, useful for power-saving applications in battery-powered robots. The digital output goes LOW when an obstacle is detected, allowing simple binary decision-making in navigation algorithms. Widely used in autonomous robot cars, obstacle-avoiding robots, and collision-detection systems. The adjustable detection range makes it more versatile than fixed-distance sensors. When combined with multiple sensors across the robot's front, enables sophisticated obstacle mapping and avoidance behavior.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "OUT", connection: "Digital", description: "Digital output - LOW when obstacle detected" },
            { name: "EN", connection: "Digital/Jumper", description: "Enable pin - LOW=active, HIGH=off, or use jumper for always-on" }
        ],
        tags: ["IR", "obstacle-avoidance", "sensor"],
        code: {
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
        tips: [
            "Adjust detection range with onboard potentiometer",
            "Use EN pin to pulse sensor for power savings",
            "Mount sensor pointing forward on robot chassis",
            "Works best with matte, non-reflective obstacles"
        ]
    },
    {
        id: 7,
        name: "Flame Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2760-00.jpg",
        category: "sensor",
        description: "Infrared-based flame detection sensor specifically optimized for identifying fire and flame signatures. Uses a photodiode with spectral sensitivity in the 720-1100 nanometer infrared range, which corresponds to the typical emission spectrum of flames and combustion. Provides both analog output (proportional to infrared intensity) and digital output (binary detection when flame detected). Offers a 60-degree detection cone, allowing detection of flames at distances up to several meters depending on flame size and ambient conditions. Commonly used in fire alarm systems, industrial safety monitoring, robotic fire-fighting applications, and autonomous firefighting robots. The analog output lets you measure flame intensity and estimate distance based on IR signal strength. Important distinction: This is an educational/hobbyist sensor and is NOT certified for actual fire safety systems—it's designed for learning and robotics projects, not critical life-safety applications.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DO", connection: "Digital", description: "Digital output - HIGH when flame detected" },
            { name: "AO", connection: "Analog", description: "Analog output - flame intensity" }
        ],
        tags: ["flame", "fire", "IR", "sensor", "safety"],
        code: {
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
    Serial.println("⚠️ FLAME DETECTED!");
    digitalWrite(ALARM_PIN, HIGH);
  } else {
    digitalWrite(ALARM_PIN, LOW);
  }
  
  Serial.print("Flame Intensity: ");
  Serial.println(flameIntensity);
  delay(200);
}`,
            notes: "Spectral range: 720-1100nm. Detection angle: 60°. Adjust threshold with potentiometer. NOT suitable as sole fire safety device!"
        },
        warnings: [
            "This is an educational sensor, NOT certified for fire safety systems",
            "Do not rely on this as your only fire detection method",
            "Test detection range with a lighter before deployment"
        ],
        tips: [
            "Mount sensor with clear line of sight to potential fire sources",
            "Can detect candles, lighters, and small fires",
            "Sunlight and other IR sources can cause false positives",
            "Use analog output for fire proximity estimation"
        ]
    },
    {
        id: 8,
        name: "Linear Hall Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/995-00.jpg",
        category: "sensor",
        description: "Hall effect magnetic field sensor providing both analog and digital outputs for versatile magnetic field detection and measurement. The analog output varies proportionally with magnetic field strength, centered at approximately 2.5V (digital value ~512) when no magnetic field is present. When you move a magnet near the sensor, the voltage changes—stronger fields in one polarity direction increase voltage, opposite polarity decreases it. This allows you to detect not just the presence of magnetic fields but also distinguish between magnetic poles and estimate magnetic strength. The digital output provides a simple threshold-based trigger, useful for proximity detection and simple on/off applications. Ideal for contactless position sensing, RPM measurement using a magnet on a rotating shaft, door/window open detection, and advanced applications like joystick centering or compass navigation. The proportional analog output enables sophisticated applications like measuring motor speed, detecting magnetic stripe patterns, or implementing soft-touch position sensors without mechanical wear.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DO", connection: "Digital", description: "Digital output - HIGH when field exceeds threshold" },
            { name: "AO", connection: "Analog", description: "Analog output - proportional to field strength" }
        ],
        tags: ["magnetic", "hall", "sensor", "position"],
        code: {
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
    Serial.println("  → North pole nearby");
  } else if (fieldStrength < 450) {
    Serial.println("  → South pole nearby");
  }
  
  delay(200);
}`,
            notes: "Sensor responds to both poles. Analog value ~512 when no magnet present. Higher = one pole, Lower = opposite pole."
        },
        tips: [
            "Use for contactless position sensing",
            "Perfect for RPM measurement with magnet on rotating shaft",
            "Can detect magnet through non-magnetic materials",
            "Useful for door/window open detection"
        ]
    },
    {
        id: 9,
        name: "Touch Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/365-00.jpg",
        category: "input",
        description: "Capacitive touch-sensing module that detects human touch without requiring mechanical button press. Uses capacitive sensing technology to measure changes in electrical capacitance when your finger approaches or touches the sensor pad. Provides both analog output (showing the capacitive value) and digital output (binary trigger when touch detected). Can work through thin materials like plastic sheets or non-conductive fabrics, enabling integration into sleek, water-resistant designs. The analog output includes 50Hz mains hum as a normal characteristic (your body picks up ambient AC frequency), which software filtering can remove if needed. Useful for creating touch-activated switches, proximity controls, and futuristic user interfaces. The sensitivity is adjustable via the onboard potentiometer. Perfect for modern UI designs where you want button-like functionality without mechanical wear or the need for exposed mechanical contacts. Requires debouncing in software to prevent multiple triggers from a single touch event.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DO", connection: "Digital", description: "Digital output - HIGH when touched" },
            { name: "AO", connection: "Analog", description: "Analog output with touch signal" }
        ],
        tags: ["touch", "capacitive", "input", "sensor"],
        code: {
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
        tips: [
            "Works through thin plastic or glass",
            "Sensitivity decreases with thicker materials",
            "Can extend touch area with wire connected to touch pad",
            "Add debouncing to prevent multiple triggers"
        ]
    },
    {
        id: 10,
        name: "Digital Temperature",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/374-00.jpg",
        category: "sensor",
        description: "Temperature detection module based on an NTC (Negative Temperature Coefficient) thermistor, providing both analog and digital outputs for temperature monitoring and control applications. The analog output returns a voltage proportional to temperature that requires mathematical conversion (using thermistor equations) to calculate actual temperature values. The digital output provides a simple threshold-based trigger—when temperature exceeds a setpoint, the output goes HIGH, useful for triggering cooling fans, alarms, or shutdowns without complex calculations. The threshold temperature is adjustable via the onboard blue potentiometer, allowing you to set the exact activation point for your application. Commonly used for fan control in circuits generating heat, thermal shutdown protection, or simple temperature monitoring without displaying exact values. Faster response time than digital sensors like DHT11 or DS18B20, making it suitable for real-time thermal protection. Requires onboard calibration against known temperatures to convert analog readings to actual Celsius or Fahrenheit values.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DO", connection: "Digital", description: "Digital output - HIGH when temp exceeds threshold" },
            { name: "AO", connection: "Analog", description: "Analog output - temperature dependent" }
        ],
        tags: ["temperature", "thermistor", "NTC", "sensor"],
        code: {
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
        tips: [
            "Adjust threshold temperature with onboard potentiometer",
            "For accurate readings, calibrate against known temperatures",
            "Allow sensor to stabilize for 1-2 minutes after power-on",
            "Keep away from heat-generating components"
        ]
    },
    {
        id: 11,
        name: "Buzzer",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1536-00.jpg",
        category: "output",
        description: "Active (self-oscillating) piezo buzzer module that produces a fixed 4000Hz tone when powered. The buzzer generates sound automatically without needing PWM frequency control—simply apply power to activate. CRITICAL: This module has reversed polarity labeling—the '-' pin connects to positive 5V and the 'S' pin connects to ground, which is opposite to normal convention. This is a common manufacturing quirk that catches many users off-guard. The buzzer outputs 80dB of sound at 4000Hz—suitable for alerts, warnings, and notification sounds in robotics and automation projects. Use a transistor or relay to control the buzzer from an Arduino pin, as the buzzer cannot be powered directly from a digital output due to current requirements. Ideal for timer alarms, motion alarms, completion notifications, and any beeping alert functionality. Since it's active (produces a fixed tone), you cannot vary the pitch, but you can control volume by pulsing the power supply on and off at different duty cycles.",
        voltage: "5V",
        pins: [
            { name: "-", connection: "Power", description: "⚠️ Connect to Arduino 5V (yes, positive!)" },
            { name: "S", connection: "Ground", description: "⚠️ Connect to Arduino GND (yes, ground!)" },
            { name: "middle", connection: "Not used", description: "Leave unconnected" }
        ],
        tags: ["buzzer", "sound", "output", "alarm"],
        code: {
            arduino: `// Active Buzzer Example
// ⚠️ WARNING: Reverse polarity!
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
        warnings: [
            "⚠️ REVERSED POLARITY: '+' to '-' pin, GND to 'S' pin",
            "Connect directly to 5V/GND (always on) or use transistor for control",
            "Do not connect 'S' pin directly to Arduino output - it's designed for GND!"
        ],
        tips: [
            "Taller housing than passive buzzer module",
            "Look for '+' label on buzzer body",
            "Fixed 4000Hz tone - cannot change frequency",
            "Use transistor/MOSFET to control on/off from Arduino pin"
        ]
    },
    {
        id: 12,
        name: "Passive Buzzer",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1536-00.jpg",
        category: "output",
        description: "Passive piezo speaker (not a buzzer) that requires an external PWM signal to generate sound, allowing you to control both frequency and tone. Unlike the Active Buzzer which produces a fixed tone, this component lets you generate any frequency from DC to ultrasonic ranges by adjusting your Arduino's PWM frequency. Typically rated at 16 ohms impedance and can handle up to 25mA continuous current safely. The Arduino's tone() function makes generating musical notes trivial—you can play melodies, create sound effects, or generate audio feedback. Produces frequencies from roughly 20Hz to 20kHz, covering the entire human hearing range. Perfect for games with sound effects, alarm systems with varied tones, musical instrument simulations, and notification sounds with variable pitch. Smaller form factor and lower cost than dedicated speakers. Maximum volume is approximately 85dB when driven at full power, making it loud enough for alarms but suitable for close-range audio in non-noise-critical environments.",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "Speaker", description: "Connect to Arduino PWM pin (one side) and GND (other side)" },
            { name: "middle", connection: "Not used", description: "Leave unconnected" }
        ],
        tags: ["speaker", "buzzer", "PWM", "output", "music"],
        code: {
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
        tips: [
            "Shorter housing than active buzzer",
            "Can play any frequency using tone() function",
            "Perfect for creating melodies and sound effects",
            "Use analogWrite() for volume control (PWM duty cycle)",
            "Add 100Ω resistor in series to reduce volume if needed"
        ]
    },
    {
        id: 13,
        name: "RGB LED",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/302-00.jpg",
        category: "output",
        description: "Common-cathode RGB LED module with integrated 150-ohm current-limiting resistors pre-installed on each color channel, making it ready for direct connection to Arduino pins without external resistors. Produces any color by mixing red, green, and blue light at different brightness levels. The LED accepts PWM signals on each color channel (0-255 values) for independent brightness control of each color, enabling millions of possible color combinations. CRITICAL MANUFACTURING DEFECT: The PCB silkscreen labels are incorrect—the pin labeled 'R' actually controls BLUE, and the pin labeled 'B' actually controls RED. This is a common defect in certain production batches. Test the actual color output when you receive the module to verify correct pin assignments. Common use cases include status indicators (green=OK, red=error, yellow=warning), RGB lighting effects, color mixing demonstrations, and decorative lighting in projects. The built-in resistors eliminate the need for external current-limiting components, significantly simplifying wiring.",
        voltage: "5V",
        pins: [
            { name: "-", connection: "Ground", description: "Common cathode - connect to Arduino GND" },
            { name: "R", connection: "Digital/PWM", description: "⚠️ Actually BLUE (PCB wrong!)" },
            { name: "G", connection: "Digital/PWM", description: "Green (correct)" },
            { name: "B", connection: "Digital/PWM", description: "⚠️ Actually RED (PCB wrong!)" }
        ],
        tags: ["LED", "RGB", "color", "output", "PWM"],
        code: {
            arduino: `// RGB LED Example (corrected pins)
// ⚠️ PCB labels are wrong!
#define BLUE_PIN 9    // Labeled 'R' on PCB
#define GREEN_PIN 10   // Labeled 'G' on PCB
#define RED_PIN 11     // Labeled 'B' on PCB

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
            notes: "⚠️ PCB PRINTING ERROR: 'R' pin is actually BLUE, 'B' pin is actually RED! Has built-in 150Ω resistors - safe for direct connection to Arduino."
        },
        warnings: [
            "PCB labels are INCORRECT! Test each color to verify pins",
            "Red and Blue pins are swapped on the silkscreen"
        ],
        tips: [
            "Use PWM pins for color mixing (pins 3,5,6,9,10,11 on Uno)",
            "Values 0-255 for each color channel",
            "Mix colors: Yellow=R+G, Cyan=G+B, Magenta=R+B, White=R+G+B",
            "Built-in resistors mean no external resistors needed"
        ]
    },
    {
        id: 14,
        name: "SMD RGB LED",
        imageUrl: "",
        category: "output",
        description: "Surface-mount RGB LED module with a smaller form factor compared to the standard RGB LED (ID 13), but WITHOUT built-in current-limiting resistors. You MUST add external 220-ohm resistors to each color pin (red, green, blue) to protect the LED and Arduino from overcurrent damage. Failing to add resistors will cause the LED to burn out or damage your Arduino's output pins. Common-cathode configuration requires the center pin to be connected to ground. Like the standard RGB LED, this module has a PCB labeling defect where GREEN and RED are swapped on the silkscreen—test your colors on receipt. The lack of built-in resistors allows for custom current limiting if you need different brightness levels across colors or when using higher-voltage power supplies. Better for space-constrained designs where saving PCB real estate is important. Requires careful attention during soldering due to the small SMD component size. Once properly configured with external resistors, provides the same full-color mixing capabilities as the standard RGB LED.",
        voltage: "5V",
        pins: [
            { name: "-", connection: "Ground", description: "Common cathode - connect to Arduino GND" },
            { name: "R", connection: "Digital/PWM", description: "⚠️ Actually GREEN (PCB wrong!)" },
            { name: "G", connection: "Digital/PWM", description: "⚠️ Actually RED (PCB wrong!)" },
            { name: "B", connection: "Digital/PWM", description: "Blue (correct)" }
        ],
        tags: ["LED", "RGB", "SMD", "output", "PWM"],
        code: {
            arduino: `// SMD RGB LED Example (corrected pins + resistors)
// ⚠️ PCB labels are wrong! Add 220Ω resistors!
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
            notes: "⚠️ PCB ERROR: 'R' is GREEN, 'G' is RED. NO built-in resistors - add 220Ω resistor to each color pin! Damage may occur without resistors."
        },
        warnings: [
            "NO BUILT-IN RESISTORS! Must add 220Ω resistor to each color pin",
            "PCB labels wrong: Red and Green are swapped",
            "Direct connection to Arduino will damage LED"
        ],
        tips: [
            "Connect: Arduino Pin → 220Ω Resistor → LED Pin → GND",
            "Use heat shrink or tape to insulate resistor connections",
            "Test with LOW brightness first to verify wiring"
        ]
    },
    {
        id: 15,
        name: "Two-Color 5mm LED",
        imageUrl: "",
        category: "output",
        description: "Two-color (bi-color) LED in the standard 5mm through-hole package that can display either red or green light depending on which pin is powered. This is achieved by having two LEDs (one red, one green) in a single package with a common cathode configuration. Control the colors by powering different pins: RED pin HIGH and GREEN pin LOW for red, GREEN HIGH and RED LOW for green, or both HIGH for orange/yellow blending using PWM for intermediate colors. Each color requires a separate 220-ohm current-limiting resistor in series to the Arduino pin to prevent LED burnout and protect the microcontroller. The common cathode connects to Arduino GND. Widely used for status indication where two states need distinct colors (working/stopped, charging/charged, unsafe/safe). By using PWM on both pins with different duty cycles, you can create orange, yellow, and amber colors for warning states. Simpler and cheaper than an RGB LED when you only need two colors.",
        voltage: "5V",
        pins: [
            { name: "-", connection: "Ground", description: "Common cathode - connect to Arduino GND" },
            { name: "middle", connection: "Digital/PWM", description: "Red anode" },
            { name: "S", connection: "Digital/PWM", description: "Green anode" }
        ],
        tags: ["LED", "bi-color", "output"],
        code: {
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
            notes: "Add 220Ω resistor to each color pin. Can mix colors by turning both on simultaneously to create orange/yellow."
        },
        tips: [
            "Perfect for status indicators (red=error, green=ok, orange=warning)",
            "Use PWM for variable orange shades",
            "Common cathode means GND is shared, control via HIGH/LOW on anodes"
        ]
    },
    {
        id: 16,
        name: "Two-Color 3mm LED",
        imageUrl: "",
        category: "output",
        description: "Compact bi-color (red/green) LED in the smaller 3mm through-hole form factor, providing the same functionality as the 5mm version but in roughly half the size. Useful for tight PCB layouts and projects where space is at a premium. Contains two LEDs (red and green) in a single package with a common cathode configuration, allowing you to display different colors by controlling which anode pin is powered. Requires external 220-ohm resistors on each color pin for current limiting. Can blend colors using PWM to create orange/yellow/amber tones by adjusting the relative brightness of each color channel. Commonly used in panel-mounted indicator lights where space constraints don't allow full-size 5mm LEDs but color indication is still essential. The smaller size comes at the cost of slightly lower brightness compared to 5mm versions—suitable for close-range viewing but may be less visible from across a room.",
        voltage: "5V",
        pins: [
            { name: "-", connection: "Ground", description: "Common cathode - connect to Arduino GND" },
            { name: "middle", connection: "Digital/PWM", description: "Red anode" },
            { name: "S", connection: "Digital/PWM", description: "Green anode" }
        ],
        tags: ["LED", "bi-color", "output", "compact"],
        code: {
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
            notes: "Identical to 5mm version but smaller form factor. Add 220Ω resistors. Great for compact projects."
        },
        tips: [
            "Smaller size good for panel mounting",
            "Use as status LED in tight spaces",
            "PWM allows color blending for yellow/orange tones"
        ]
    },
    {
        id: 17,
        name: "Reed Switch",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/375-00.jpg",
        category: "switch",
        description: "Magnetic reed switch module with an integrated comparator circuit providing both analog and digital outputs for flexible magnetic detection. The reed switch itself is a mechanical switch that closes when exposed to a magnetic field (typically from a nearby magnet), with contact closure independent of field strength once threshold is exceeded. The module's analog output lets you measure magnetic field strength, while the digital output provides simple on/off switching when the field exceeds a user-adjustable threshold (set via the onboard potentiometer). Commonly used for door/window open-close detection, security systems, and non-contact position sensing applications. The reed switch itself is hermetically sealed inside a glass tube, making it reliable and maintenance-free—no moving parts to wear out. Ideal for non-contact proximity detection without the power consumption or false-trigger issues of active IR sensors. The built-in 10kΩ pull-up resistor simplifies circuit design. Operates reliably at any orientation and can be mounted discreetly behind door frames.",
        voltage: "5V",
        pins: [
            { name: "G", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "AO", connection: "Analog", description: "Analog output" },
            { name: "DO", connection: "Digital", description: "Digital output - threshold based" }
        ],
        tags: ["reed", "magnetic", "switch", "sensor"],
        code: {
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
    Serial.println("⚠️ Door OPEN!");
    digitalWrite(ALARM_PIN, HIGH);
  }
  
  delay(500);
}`,
            notes: "Reed switch closes when magnet is nearby. Perfect for non-contact switching applications like door/window sensors."
        },
        tips: [
            "Mount switch on door frame, magnet on door",
            "Works through non-magnetic materials (wood, plastic)",
            "Keep magnet aligned with switch for reliable operation",
            "Typical activation distance: 10-20mm depending on magnet strength"
        ]
    },
    {
        id: 18,
        name: "Mini Reed Switch",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/375-00.jpg",
        category: "output",
        description: "Miniaturized reed switch breakout module designed for space-constrained applications where the standard Reed Switch module is too large. Features an integrated 10kΩ pull-up or pull-down resistor between the middle pin and one outer pin, simplifying circuit design by eliminating the need for external resistor components. The reed switch contacts are on the outer pins, closing when a magnetic field is applied. Provides digital-only output (unlike the standard module which includes analog measurement capability). Perfect for compact robotic implementations, wearable projects, and space-limited enclosures requiring magnetic proximity detection. The integrated resistor can be configured as either pull-up or pull-down depending on your wiring—middle pin connects to 5V or GND, and the switch pin goes to your Arduino input. Maintains the same reliability and maintenance-free operation of traditional reed switches while consuming minimal PCB space. Excellent for hidden door sensors, magnetic position detectors, and non-contact tilt switches.",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "Switch", description: "Reed switch contacts" },
            { name: "middle", connection: "Power/Signal", description: "Connect to 5V or Arduino input" },
            { name: "S", connection: "Ground/Pull resistor", description: "10kΩ resistor connection point" }
        ],
        tags: ["reed", "magnetic", "switch", "compact"],
        code: {
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
            notes: "Built-in 10kΩ resistor between middle and 'S' pins. Can be configured as pull-up or pull-down depending on wiring."
        },
        tips: [
            "More compact than standard reed switch module",
            "Use internal resistor to simplify wiring",
            "Great for hidden door/window sensors in projects"
        ]
    },
    {
        id: 19,
        name: "Heartbeat Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1093-00.jpg",
        category: "sensor",
        description: "Optical pulse detection sensor using infrared light to measure blood flow through skin tissue. Consists of an IR LED that illuminates the tissue and a phototransistor that detects light reflected/transmitted through blood vessels. When blood pulses through capillaries with each heartbeat, the light absorption changes, creating a fluctuating signal that you can process to determine heart rate and beat timing. This is a basic sensor requiring external signal amplification and filtering circuits to extract usable heart rate data—it's not plug-and-play like dedicated pulse sensors. Includes a 330-ohm resistor for the LED current limiting. Your analog input reads the raw sensor signal, which contains both the heart pulse signal and substantial noise from ambient light and body movement. You must implement digital filtering algorithms (moving average, high-pass filtering) to extract the heartbeat signal from the noisy raw data. Primarily used for educational robotics projects and learning about biological signal processing rather than medical monitoring. Place your fingertip gently between the LED and sensor (not with excessive pressure, which restricts blood flow).",
        voltage: "5V",
        pins: [
            { name: "middle", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "S", connection: "Analog", description: "Sensor output (analog signal)" }
        ],
        tags: ["pulse", "heartbeat", "biometric", "sensor", "IR"],
        code: {
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
            notes: "This is a basic sensor requiring external amplification for reliable results. 330Ω LED resistor included. Has built-in pull-up on sensor output."
        },
        warnings: [
            "Requires signal conditioning/amplification for accurate readings",
            "Basic setup may not give reliable heartbeat detection",
            "Consider using dedicated pulse sensor modules for better results"
        ],
        tips: [
            "Place fingertip gently between LED and sensor",
            "Avoid pressing too hard - restricts blood flow",
            "Works best in low ambient light",
            "May need op-amp circuit for reliable detection",
            "Use red LED instead of IR for better visible feedback"
        ]
    },
    {
        id: 20,
        name: "7-Color Flash LED",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2167-00.jpg",
        category: "output",
        description: "Autonomous RGB LED module with an integrated microcontroller that cycles through a pre-programmed sequence of seven distinct colors without any external control. Simply apply power and the LED automatically cycles: red → green → blue → cyan → magenta → yellow → white, then repeats. No Arduino code required—the LED operates independently with its own built-in timing logic. Perfect for decorative lighting, attention-getting indicators in installations, emergency warnings, or add mood lighting to projects without consuming Arduino program space or I/O pins. You can control on/off using a transistor or relay from an Arduino pin if you want to enable/disable the cycling remotely, but the color sequence itself is fixed and unchangeable. Cannot control individual colors or the cycling speed. Much simpler than addressable LEDs like WS2812B but less flexible. The sequence timing makes it suitable for decorative applications and lighting effects where the fixed color pattern is an aesthetic feature rather than a limitation.",
        voltage: "5V",
        pins: [
            { name: "S", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "middle", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "-", connection: "Not used", description: "Leave unconnected" }
        ],
        tags: ["LED", "RGB", "auto", "output", "color"],
        code: {
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
        tips: [
            "Perfect for decoration with no programming needed",
            "Use transistor/MOSFET to control from Arduino pin",
            "Cannot change color sequence or speed",
            "Good for teaching basic power control concepts"
        ]
    },
    {
        id: 21,
        name: "Laser Emitter",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1673-00.jpg",
        category: "output",
        description: "650-nanometer red laser diode module producing a focused coherent light beam suitable for laser pointer applications, laser tripwire sensors, laser tag systems, and optical alignment tasks. Operates on 5V and can be pulsed on/off from Arduino digital pins or power-supply-gated via a transistor for intensity control. The laser creates an intense, narrow beam ideal for precision applications where you need highly directional light concentration. Commonly paired with light sensors to create beam-break detection systems for intrusion alarms, object counting, or gaming applications. CRITICAL SAFETY WARNINGS: Never point the laser at eyes or reflective surfaces where the beam could reflect into eyes—laser light can cause permanent eye damage, including blindness, even at distances from the source. Classified as a Class 2 or 3 laser depending on power output. Always treat as hazardous and use appropriate laser safety goggles when working with the system. Suitable for robotic applications like line-following with beam break detection, distance measurement using beam reflection, or creating optical logic gates in optical computing education.",
        voltage: "5V",
        pins: [
            { name: "S", connection: "Power", description: "Connect to Arduino 5V (or control pin via transistor)" },
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "middle", connection: "Not used", description: "Leave unconnected" }
        ],
        tags: ["laser", "output", "650nm"],
        code: {
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
            notes: "650nm wavelength red laser. Designed for 5V direct connection or transistor control."
        },
        warnings: [
            "⚠️ NEVER point laser at eyes or reflective surfaces",
            "⚠️ Class 2 laser - can cause eye damage with prolonged exposure",
            "Keep away from children and pets",
            "Use appropriate laser safety goggles if needed",
            "Check local regulations regarding laser use"
        ],
        tips: [
            "Perfect for laser tripwires and alignment projects",
            "Combine with photoresistor for break-beam sensor",
            "Use in low ambient light for best visibility",
            "Add heatsink if running continuously for long periods"
        ]
    },
    {
        id: 22,
        name: "Push Button",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1010-00.jpg",
        category: "input",
        description: "Momentary tactile push button switch on a breakout module with an integrated 10kΩ pull-up resistor that simplifies wiring and circuit design. The button is normally open (not conducting) and closes when pressed, completing the circuit. The outer pins contain the switch contacts (normally open), and the middle pin connects through a 10kΩ resistor to one of the switch contacts, allowing the module to work in either pull-up or pull-down configuration depending on your wiring. The button has inherent mechanical bounce—when physically pressed, the electrical contact doesn't settle immediately but bounces on and off for a few milliseconds, causing your Arduino to detect multiple press events from a single physical button press. Software debouncing is essential—either delay for 50ms after detecting a press before checking again, or use a proper debounce algorithm comparing the button state over multiple reads. Ideal for user input in robotics projects, menu navigation, mode selection, and any application requiring simple momentary user interaction. Standard footprint allows substitution with other switches if needed.",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "Switch", description: "Push button contacts (normally open)" },
            { name: "middle", connection: "Power/Input", description: "Connect to 5V or Arduino input pin" },
            { name: "S", connection: "Resistor", description: "10kΩ resistor connection (GND or signal)" }
        ],
        tags: ["button", "switch", "input"],
        code: {
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
            notes: "Built-in 10kΩ resistor simplifies wiring. Use INPUT_PULLUP mode or wire external pull-up/down resistor."
        },
        tips: [
            "Always implement debouncing for reliable button reading",
            "Use interrupts for responsive button handling",
            "Button.h library provides easy debouncing",
            "Active LOW when pressed (reads 0)"
        ]
    },
    {
        id: 23,
        name: "Shock Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2384-00.jpg",
        category: "sensor",
        description: "Motion and vibration detection sensor using a rolling ball mechanism that closes a switch contact when suddenly tilted or subjected to sharp impacts/vibrations. Contains a small conductive ball inside an enclosed tube with contact points—normal gentle movement or tilting doesn't trigger the switch, but sharp taps, knocks, or vibration causes the ball to roll and make electrical contact. Integrated 10kΩ pull-up resistor eliminates external resistor requirements. The sensor output is a mechanical switch contact (normally open), making it very simple to interface—just read a digital input that goes LOW when the shock is detected. Perfect for non-invasive theft/tampering detection, knock-activated circuits, vibration alarms, and impact-responsive systems. Useful in robotics for detecting collisions or sudden impacts without needing expensive accelerometers. Mechanical design means no calibration required—you just adjust sensitivity by changing your code's debounce logic. Less sensitive than accelerometers, so won't trigger from motor vibrations or normal operation, only from deliberate impacts or significant environmental vibration.",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "Switch", description: "Shock sensor contacts" },
            { name: "middle", connection: "Power/Input", description: "Connect to 5V or Arduino input" },
            { name: "S", connection: "Resistor/GND", description: "10kΩ resistor connection point" }
        ],
        tags: ["shock", "vibration", "tilt", "sensor"],
        code: {
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
    Serial.println("⚠️ SHOCK DETECTED!");
    
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
        tips: [
            "Perfect for knock detection and anti-theft alarms",
            "Sensitivity depends on orientation",
            "May trigger from nearby vibrations (table bump, etc.)",
            "Add software filtering to reduce false triggers"
        ]
    },
    {
        id: 24,
        name: "Rotary Encoder",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/377-00.jpg",
        category: "input",
        description: "Incremental rotary encoder that counts rotational steps with directional awareness using quadrature encoding. The encoder outputs two phase-shifted digital signals (Clock and Data pins) that allow your Arduino to determine both the number of rotation steps and the direction (clockwise vs. counter-clockwise). One complete rotation typically produces 20 steps (some encoders offer different resolutions like 30 or 40 steps per rotation). Integrated push button allows simultaneous button input—press the knob for additional control. Quadrature encoding uses the timing relationship between the two signals to determine direction: if Clock and Data are in-phase, rotation is clockwise; if out-of-phase, counter-clockwise. Ideal for user interface applications like menu scrolling, volume control, parameter adjustment, and any application needing continuous rotational input with directional control. Use interrupts on the Clock pin for responsive, high-speed encoding reading. Perfect for robot motion control, robot arm positioning, and human-machine interface design. The mechanical detents (clicks you feel when turning) correspond to the step positions, providing tactile feedback.",
        voltage: "5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "CLK", connection: "Digital", description: "Clock signal (encoder A)" },
            { name: "DT", connection: "Digital", description: "Data signal (encoder B)" },
            { name: "SW", connection: "Digital", description: "Switch (button press)" }
        ],
        tags: ["encoder", "rotation", "input", "knob"],
        code: {
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
        tips: [
            "Use interrupts on CLK pin for responsive reading",
            "Great for volume controls, menu navigation",
            "Some encoders have detents (clicks) - this affects step count",
            "Encoder library available for easier implementation"
        ]
    },
    {
        id: 25,
        name: "Light Cup (Tilt with LED)",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/173-00.jpg",
        category: "sensor",
        description: "Integrated tilt-sensing module combining a mercury-based tilt switch with an onboard red LED, creating tilt-activated lighting effects without requiring external components. The mercury switch closes contact when the module is tilted past a threshold angle, and simultaneously the built-in LED lights up. Includes a 10kΩ pull-up resistor for the switch signal simplifying circuit integration. The red LED requires a 220-ohm series resistor if you want to control it separately from the switch, or can operate directly from the switch closure in passive applications. Originally designed for novelty items like light-up cups that illuminate when tilted at a glass. The mercury switch provides simple binary tilt detection without directional information—it triggers when tilted but doesn't tell you how far or in which direction. Great for educational physics demonstrations of tilt detection, angle sensing, and light response. Creates interesting effects where tilting the module illuminates the LED automatically due to the mechanical closure of the mercury switch.",
        voltage: "5V",
        pins: [
            { name: "G", connection: "Ground", description: "Common ground for LED cathode and switch" },
            { name: "S", connection: "Digital", description: "Switch contact" },
            { name: "L", connection: "LED+", description: "LED anode (needs series resistor ~220Ω)" },
            { name: "+", connection: "Pull-up", description: "10kΩ pull-up to 'S'" }
        ],
        tags: ["tilt", "mercury", "LED", "switch"],
        code: {
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
            notes: "Mercury switch changes state based on tilt angle. LED requires 220Ω series resistor. Built-in 10kΩ pull-up on switch."
        },
        warnings: [
            "Contains mercury - handle with care",
            "Do not break or disassemble",
            "Dispose of properly according to local hazardous waste regulations"
        ],
        tips: [
            "Perfect for tilt-activated night lights",
            "Can be used as a simple level sensor",
            "Response depends on tilt angle and orientation"
        ]
    },
    {
        id: 26,
        name: "Tilt Switch",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/173-00.jpg",
        category: "switch",
        description: "Simple mechanical tilt switch containing liquid mercury that flows to make or break electrical contact based on module orientation. The mercury flows to the lowest point when tilted, establishing contact between the electrodes at that position, and breaks contact when oriented back to horizontal or tilted the opposite direction. Provides only two states: tilted (contact closed) or upright (contact open). No sensitivity adjustment—the switch triggers at a fixed angle, typically around 45-90 degrees from horizontal depending on design. Requires use of INPUT_PULLUP on your Arduino to properly read the switch state. Perfect for level detection, orientation sensing, and simple tilt-triggered applications like alarm systems that activate when an object is tilted or turned over. The mercury inside is hermetically sealed, making it reliable and maintenance-free with no moving parts to wear out beyond the mercury flowing naturally. Not suitable for applications requiring continuous angle measurement—only tells you whether something is tilted or upright.",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "Switch", description: "Tilt switch contacts" },
            { name: "middle", connection: "Not used", description: "Leave unconnected" }
        ],
        tags: ["tilt", "mercury", "switch", "orientation"],
        code: {
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
        warnings: [
            "Contains mercury - toxic if broken",
            "Keep away from children",
            "Proper disposal required - check local regulations"
        ],
        tips: [
            "Mount at appropriate angle for your application",
            "Can be used as simple level indicator",
            "Consider mercury-free alternatives (rolling ball switches)"
        ]
    },
    {
        id: 27,
        name: "Rolling Ball Tilt Switch",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/173-00.jpg",
        category: "switch",
        description: "Environmentally-friendly mercury-free alternative to traditional mercury tilt switches, using a small conductive ball rolling inside a tube to make and break contact. Provides the same basic tilt-detection functionality as mercury switches but without the environmental and health hazards of mercury. The ball flows to establish contact when tilted and breaks contact when returned to horizontal/upright. Maximum switching rating: 12 volts DC at 50 milliamps—suitable for low-voltage Arduino logic but not for switching high-current AC mains loads. Integrated 10kΩ resistor simplifies circuit design. Slightly less reliable than mercury switches due to the ball not always rolling perfectly due to residual bounce or stiction, but still provides adequate performance for most applications. Hysteresis logic in your code can filter false state changes. Perfect for eco-conscious projects where mercury is prohibited or undesirable. Mechanically simpler than mercury switches but with slightly less predictable operation. Great for orientation detection, level indication, and simple tilt-activated triggers where mercury-free operation is a requirement.",
        voltage: "5-12V",
        pins: [
            { name: "outer pins", connection: "Switch", description: "Tilt switch contacts" },
            { name: "middle", connection: "Power/Input", description: "Connect to 5V or input pin" },
            { name: "S", connection: "Resistor/GND", description: "10kΩ resistor connection" }
        ],
        tags: ["tilt", "ball", "switch", "mercury-free"],
        code: {
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
            notes: "Eco-friendly alternative to mercury switches. Built-in 10kΩ resistor. Max switching: 12VDC 50mA."
        },
        tips: [
            "More environmentally friendly than mercury switches",
            "May be less reliable than mercury due to ball bounce",
            "Add debouncing in software for clean state changes",
            "Works in any orientation - test to find optimal mounting angle"
        ]
    },
    {
        id: 28,
        name: "Photoresistor (LDR)",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/161-00.jpg",
        category: "sensor",
        description: "Light-dependent resistor (photoresistor or LDR) that changes electrical resistance based on ambient light intensity, allowing you to measure light levels with an analog input. In complete darkness, the LDR has extremely high resistance (>20 megaohms, essentially an open circuit). Under bright light, resistance drops dramatically to <80 ohms. This huge resistance range makes LDRs ideal for light-level measurement. The module includes an integrated 10kΩ resistor that forms a voltage divider with the LDR, producing a usable analog voltage at the output that varies from near-0V in darkness to near-5V in bright sunlight. Analog input readings range from 0 (dark) to 1023 (bright), but the relationship is non-linear—you must calibrate your specific LDR against known light levels for accurate readings. Perfect for automatic night-light activation, light-tracking robots, light-level monitoring, and daylight-responsive automation. Response is logarithmic rather than linear, so doubling the light doesn't double the output. Slow response time (tens of milliseconds) means it's not suitable for high-frequency light modulation detection like IR communication decoding.",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "LDR", description: "Photoresistor terminals" },
            { name: "middle", connection: "Power", description: "Connect to 5V" },
            { name: "S", connection: "Signal/Resistor", description: "Analog output / 10kΩ resistor to GND" }
        ],
        tags: ["light", "LDR", "photoresistor", "sensor"],
        code: {
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
    // Dark - turn on LED
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
            notes: "Forms voltage divider with 10kΩ resistor. Lower readings = darker. Higher readings = brighter. Calibrate threshold for your environment."
        },
        tips: [
            "Perfect for automatic night lights and solar trackers",
            "Cover with tube to reduce field of view if needed",
            "Response is logarithmic - not linear with light intensity",
            "Allow time to stabilize after power-on",
            "Use multiple LDRs for light direction sensing"
        ]
    },
    {
        id: 29,
        name: "DHT11 Temp & Humidity",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/386-00.jpg",
        category: "sensor",
        description: "Digital relative humidity and temperature sensor providing simultaneous measurement of both environmental parameters over a single data wire. Temperature range: 0°C to 50°C with ±2°C accuracy; Humidity range: 20% to 95% with ±5% accuracy. Uses a proprietary single-wire digital protocol (one-wire, not I2C or SPI). The sensor is polled for readings—your code requests a measurement and waits for the DHT11 to return two bytes of temperature data and two bytes of humidity data. Requires the DHT library for Arduino (available in Library Manager). Must wait at least 2 seconds between consecutive readings or you'll get stale cached data. Integrated 10kΩ pull-up resistor on the data line simplifies circuit design. Extremely cost-effective solution for environmental monitoring, HVAC control, greenhouse automation, and weather station projects. The slow 2-second minimum polling interval limits it for real-time applications but is perfectly adequate for slowly-changing environmental monitoring. More accurate than NTC thermistors but slower response than direct temperature-sensitive devices. Becomes less accurate at temperature extremes and very high humidity levels due to the sensor design.",
        voltage: "3-5.5V",
        pins: [
            { name: "+", connection: "Power", description: "Connect to Arduino 5V (3-5.5V OK)" },
            { name: "OUT", connection: "Digital", description: "Data pin - single wire protocol" },
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" }
        ],
        tags: ["temperature", "humidity", "DHT11", "sensor", "digital"],
        code: {
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
  Serial.println("°C");
}`,
            notes: "Requires DHT.h library (install via Library Manager). Built-in 10kΩ pull-up included. Wait 2 seconds between readings."
        },
        tips: [
            "Install DHT sensor library: Sketch → Include Library → Manage Libraries → search 'DHT'",
            "Allow sensor to stabilize for 1-2 seconds after power-on",
            "Do not query faster than once every 2 seconds",
            "Readings can lag actual conditions by a few seconds",
            "For better accuracy, use DHT22 (separate sensor, same library)"
        ]
    },
    {
        id: 30,
        name: "Analog Hall Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/995-00.jpg",
        category: "sensor",
        description: "Digital Hall effect sensor module using the 44E311 or 3144 Hall effect IC with integrated comparator circuit and LED indicator light. Provides purely digital output—the sensor goes LOW (active-low) when a magnetic field is detected, with the threshold set by internal hysteresis. The onboard LED lights up when a magnet is detected, providing visual feedback for debugging and operation verification. Most useful for simple presence/absence detection rather than analog measurement—either a magnet is present or it isn't. Commonly used for RPM/speed measurement by mounting a magnet on a rotating shaft and counting pulses per second, position detection for door/window switches, and Hall-effect proximity sensors. The digital output is simple to process—use interrupts for high-speed counting applications or simple digitalRead() for threshold detection. Built-in LED adds no functionality to the circuit but helps troubleshooting by showing when the sensor detects a magnet. This module is different from the Linear Hall Sensor which provides proportional analog output—choose this for simple on/off detection, the linear version for field-strength measurement.",
        voltage: "5V",
        pins: [
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "middle", connection: "Power", description: "Connect to Arduino 5V (Vs)" },
            { name: "S", connection: "Digital", description: "Digital output - LOW when magnet detected" }
        ],
        tags: ["hall", "magnetic", "sensor", "digital"],
        code: {
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
        tips: [
            "Perfect for RPM measurement (attach magnet to rotating shaft)",
            "Use interrupts for accurate counting at high speeds",
            "LED provides visual feedback - useful for testing",
            "Detects presence, not field strength (digital on/off only)"
        ]
    },
    {
        id: 31,
        name: "Hall Magnetic Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/995-00.jpg",
        category: "sensor",
        description: "Analog Hall effect sensor providing a voltage output that varies continuously with magnetic field strength and polarity, allowing precise measurement of magnetic fields. Unlike the digital Analog Hall Sensor (ID 30) which provides simple on/off detection, this module outputs an analog voltage proportional to the field strength—approximately 2.5V (digital value ~512) with no magnetic field present. Stronger fields cause the voltage to shift: increasing in one direction for north pole proximity, decreasing for south pole proximity. This polarity sensitivity enables you to distinguish between magnetic poles and determine their orientation. Perfect for applications requiring precise position sensing, measuring magnetic field strength, and implementing soft-touch position controls. Must be calibrated during system startup to determine the baseline (no-field) voltage",
        voltage: "5V",
        pins: [
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "middle", connection: "Power", description: "Connect to Arduino 5V (Vs)" },
            { name: "S", connection: "Analog", description: "Analog output - voltage varies with field" }
        ],
        tags: ["hall", "magnetic", "sensor", "analog"],
        code: {
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
        tips: [
            "Calibrate baseline reading with no magnet present",
            "Use for precise position sensing",
            "Can measure magnetic field strength, not just presence",
            "Polarity detection allows distinguishing N/S poles",
            "Filter readings with running average for stability"
        ]
    },
    {
        id: 32,
        name: "DS18B20 Temperature",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/381-00.jpg",
        category: "sensor",
        description: "High-precision digital one-wire temperature sensor offering temperature measurement from -55°C to +125°C with excellent accuracy of ±0.5°C over most of that range. Uses the one-wire protocol (not I2C or SPI), allowing multiple DS18B20 sensors to share a single Arduino pin, each identified by a unique 64-bit serial number. This multi-sensor capability makes DS18B20 perfect for multi-point temperature monitoring in large structures, distributed sensor arrays, and systems requiring simultaneous temperature reading from many locations without consuming multiple Arduino pins. Temperature measurement resolution is selectable: 12-bit default provides 0.0625°C resolution. Response time is relatively slow (~750ms for 12-bit resolution) but accurate. Integrated 4.7kΩ pull-up resistor simplifies wiring—only three wires needed (power, ground, data). Requires OneWire and DallasTemperature libraries available in Library Manager. Much more accurate than DHT11 or thermistor-based sensors for temperature-critical applications. Waterproof variants available in a TO-92 or probe format for temperature sensing in liquids or enclosed spaces",
        voltage: "5V",
        pins: [
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "middle", connection: "Digital", description: "One-Wire data bus" },
            { name: "+", connection: "Power", description: "Connect to Arduino 5V" }
        ],
        tags: ["temperature", "DS18B20", "one-wire", "digital", "precision"],
        code: {
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
  Serial.print("°C (");
  Serial.print(tempC * 9.0 / 5.0 + 32.0);
  Serial.println("°F)");
  
  delay(1000);
}`,
            notes: "Requires OneWire and DallasTemperature libraries. Built-in 4.7kΩ pull-up resistor. Each sensor has unique 64-bit address for multi-sensor networks."
        },
        tips: [
            "Install libraries: Sketch → Include Library → Manage Libraries",
            "Search for 'OneWire' and 'DallasTemperature'",
            "Can connect multiple DS18B20 sensors to same pin",
            "Each sensor has unique ID for individual addressing",
            "Much more accurate than DHT11 for temperature",
            "Waterproof versions available for liquid temperature sensing",
            "Only one 4.7kΩ pull-up needed even with multiple sensors"
        ]
    },
    {
        id: 33,
        name: "Analog Temperature",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/374-00.jpg",
        category: "sensor",
        description: "Analog NTC (Negative Temperature Coefficient) thermistor-based temperature sensor providing a voltage output that varies with temperature, enabling temperature measurement without a dedicated digital sensor. Temperature measurement range: -55°C to +125°C with ±0.5°C accuracy when properly calibrated. The module includes a 10kΩ reference resistor forming a voltage divider with the thermistor—as temperature increases, the thermistor resistance decreases, shifting the output voltage higher. The analog output requires calibration against known temperatures to convert raw readings to actual Celsius or Fahrenheit values using the Steinhart-Hart equation or experimentally-determined lookup tables. Much faster response than digital sensors like DHT11 (sub-millisecond) but requires more calculation to determine absolute temperature. Perfect for relative temperature measurement where you only need to know if temperature is increasing/decreasing rather than the exact value. Extremely cost-effective solution for temperature sensing in embedded projects. Non-linear response requires calibration, but once calibrated provides good accuracy. Useful for thermal protection systems that respond to temperature changes, heat tracking, or where fast temperature response is critical but absolute accuracy is less important.",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "Thermistor", description: "NTC thermistor ~10kΩ at 25°C" },
            { name: "middle", connection: "Power", description: "Connect to 5V" },
            { name: "S", connection: "Signal", description: "Analog output / 10kΩ to GND" }
        ],
        tags: ["temperature", "NTC", "thermistor", "analog"],
        code: {
            arduino: `// NTC Thermistor Temperature Sensor
#define THERMISTOR_PIN A0

// Thermistor parameters (typical values - calibrate for accuracy)
const float BETA = 3950;  // Beta coefficient
const float R0 = 10000;   // Resistance at 25°C
const float T0 = 298.15;  // 25°C in Kelvin

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
  Serial.print("°C (");
  Serial.print(tempF, 1);
  Serial.println("°F)");
  
  delay(1000);
}`,
            notes: "Forms voltage divider with 10kΩ resistor. Requires calibration for accurate absolute readings. Beta value varies by thermistor - check datasheet."
        },
        tips: [
            "Good for relative temperature measurements",
            "For accurate readings, determine exact Beta coefficient",
            "Calibrate against known temperatures (ice water, boiling water)",
            "Response is non-linear - use Steinhart-Hart equation",
            "Faster response than DS18B20 but less accurate",
            "Keep leads short to minimize noise pickup"
        ]
    },
    {
        id: 34,
        name: "IR Transmitter LED",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/387-00.jpg",
        category: "output",
        description: "Infrared light-emitting diode (LED) component for transmitting infrared signals used in remote controls, light barriers, and proximity detection systems. Requires current-limiting series resistor (typically 100-220 ohms) and can be controlled from Arduino digital pins or PWM for intensity control. The IR light is invisible to human eyes—you can verify it's working using your phone's camera which is sensitive to IR wavelengths. For remote control protocols, the IR LED must be pulsed at 38kHz carrier frequency while modulating the on/off timing to encode the command data. Paired with an IR receiver module (ID 35) you can build complete wireless remote control systems compatible with standard TV remotes and consumer electronics. Simple light-barrier applications just pulse the IR LED while monitoring an IR receiver across the gap—when broken, the detector signal changes. Can be used as a proximity sensor by timing reflections from nearby objects. Requires the IRremote library for standard remote control protocols. Lower power than visible light LEDs, allowing pulsed operation without excessive heat generation",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "IR LED", description: "IR LED anode and cathode" },
            { name: "S", connection: "Signal", description: "Connect to Arduino PWM pin via resistor" },
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" }
        ],
        tags: ["IR", "infrared", "LED", "transmitter", "remote"],
        code: {
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
            notes: "Add current-limiting resistor (~100-220Ω). For IR remote control, use IRremote library and modulate at 38kHz. For light barriers, continuous or pulsed operation."
        },
        tips: [
            "Install IRremote library for remote control protocols",
            "Standard TV remotes use 38kHz carrier frequency",
            "Can't see IR LED with naked eye - use phone camera to test",
            "Use with IR receiver module for bidirectional communication",
            "Add 100Ω resistor in series to limit current",
            "Works through most plastics - good for hidden installations"
        ]
    },
    {
        id: 35,
        name: "IR Receiver",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/157-00.jpg",
        category: "sensor",
        description: "Infrared receiver module (using the 1838 IR receiver IC) designed to receive encoded infrared signals transmitted by remote controls and IR transmitters. Internally demodulates 38kHz carrier-wave modulated signals, extracting the digital command data from the IR beam. Provides simple digital output that pulses LOW during IR signal reception. Works with almost all consumer IR remote controls including TV remotes, air-conditioner remotes, DVD player remotes using NEC, Sony, RC5, and other standard protocols. Typical operating range is 18 meters line-of-sight, but can reach further with higher-power IR transmitters. Requires the IRremote library (Library Manager) to decode received signals into readable command data. The digital output goes LOW when receiving, allowing you to trigger interrupts on the state change for responsive command detection. Perfect for building wireless-controlled robots, appliance controllers, and interactive systems that respond to standard remote control commands. Angle of reception is approximately 90 degrees—place the receiver pointing at the expected IR source for best performance. Completely passive operation—receives only, cannot transmit, so must be paired with a transmitter for bidirectional communication.",
        voltage: "2.7-5.5V",
        pins: [
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "middle", connection: "Power", description: "Connect to Arduino 5V (2.7-5.5V)" },
            { name: "S", connection: "Digital", description: "Digital output - demodulated IR signal" }
        ],
        tags: ["IR", "receiver", "remote", "sensor", "1838"],
        code: {
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
            notes: "Frequency: 37.9kHz (works with standard 38kHz remotes). Range: ~18m. Receiving angle: 90°. Requires IRremote library for decoding."
        },
        tips: [
            "Install IRremote library via Library Manager",
            "Point remote directly at receiver for best results",
            "Works with most TV/appliance remotes (NEC, Sony, RC5 protocols)",
            "Can decode and replay remote codes",
            "Use for remote control projects, automation",
            "Built-in demodulator - no need for 38kHz detection code",
            "Attach interrupt for responsive receiving"
        ]
    },
    {
        id: 36,
        name: "Tap Module (Vibration)",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/3649-00.jpg",
        category: "sensor",
        description: "Mechanical vibration and shock sensor for detecting taps, knocks, impacts, and vibrations through momentary switch closure. Contains a mechanical spring-loaded contact that closes briefly when the module experiences sudden acceleration or impact. Useful for knock detection, tap-based input systems, vibration monitoring, and impact sensing in robotics and structural monitoring. The output is momentary—once the vibration stops, the switch opens again. Extremely simple interface—just a switch closure, no analog measurement or complex protocols. Requires software debouncing to filter the mechanical bounce that occurs when the switch contacts settle. Sensitivity depends heavily on mechanical mounting—rigidly mounted systems are more sensitive to vibrations, while loosely-mounted systems filter small vibrations. Perfect for tap-to-activate features, knock-knock joke detection systems, and vibration alarms that trigger on physical impacts. Less sensitive than accelerometers but much simpler and cheaper. Good for applications where you only care about detecting significant impacts, not measuring their magnitude or direction.",
        voltage: "5V",
        pins: [
            { name: "outer pins", connection: "Switch", description: "Vibration sensor contacts (momentary)" },
            { name: "middle", connection: "Not used", description: "Leave unconnected" }
        ],
        tags: ["vibration", "tap", "knock", "shock", "sensor"],
        code: {
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
        tips: [
            "Mount firmly to surface for best sensitivity",
            "Add software debouncing to filter multiple triggers",
            "Great for knock-activated locks or attention-getting",
            "Sensitivity varies with mounting - experiment with placement",
            "Can detect footsteps, door slams, table taps",
            "Not suitable for precise vibration measurement - just detection"
        ]
    },
    {
        id: 37,
        name: "Light Blocking (Slotted Sensor)",
        imageUrl: "",
        category: "sensor",
        description: "Slotted optical sensor with an integrated IR LED and phototransistor, designed for detecting objects passing through the slot between the two sides. When an opaque object (like a flag on a rotating wheel) passes through the slot, it blocks the IR beam, causing the output to change state. Ideal for RPM measurement by mounting the sensor on a robot chassis and attaching a flag to the wheel—one pulse per revolution allows speed calculation. Perfect for object counting on conveyor systems, encoder applications, and position detection where you need to count discrete events. The output has an integrated 10kΩ pull-up resistor making it ready for direct connection to Arduino digital inputs. Much simpler and cheaper than using motors with integrated encoders, making it excellent for robotics education and DIY projects. For accurate high-speed counting, attach an interrupt handler to the output pin rather than polling. Can chain multiple sensors to detect direction by mounting them at offset positions. The slot width determines the minimum object size that can trigger the sensor—wider slots require larger objects to block the beam.",
        voltage: "5V",
        pins: [
            { name: "middle", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "-", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "right", connection: "Digital", description: "Digital output - LOW when blocked, HIGH when clear (10kΩ pull-up)" }
        ],
        tags: ["optical", "slotted", "IR", "sensor", "encoder"],
        code: {
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
            notes: "Output has 10kΩ pull-up to 5V. Goes LOW when IR beam blocked, HIGH when clear. Perfect for encoders and RPM measurement."
        },
        tips: [
            "Use interrupt for accurate high-speed counting",
            "Create encoder disk with multiple slots for higher resolution",
            "Slot width determines minimum detectable object size",
            "Great for motor speed measurement",
            "Can count objects on conveyor belt",
            "Use with multiple sensors for direction detection",
            "Keep slot clean - dust can cause false triggers"
        ]
    },
    {
    "id": 38,
    "name": "Ultrasonic Distance Sensor (HC-SR04)",
    "category": "sensor",
    "description": "Non-contact ultrasonic distance sensor (HC-SR04 compatible) that measures distance by emitting 40kHz ultrasonic sound waves and measuring the time for the echo to return from an obstacle. Effective measurement range from 2 centimeters (minimum safe distance before sensor is blinded) to 400 centimeters (approximately 13 feet). Based on the time delay between transmitted pulse and received echo, you calculate distance using the formula: distance = (echo_time × speed_of_sound) / 2. This is the most common sensor for robot obstacle avoidance, distance measurement in autonomous vehicles, and industrial proximity detection applications. Provides non-contact measurement unaffected by surface color, opacity, or reflectivity—works equally well on black cloth as white painted surfaces. Both Vcc (power) and GND (ground) connections plus two digital pins for Trig (trigger the measurement pulse) and Echo (receive the echo signal duration). The Trig pin receives a 10-microsecond HIGH pulse to initiate measurement, then you time how long the Echo pin stays HIGH—this duration directly correlates to distance. Ideal for robotics projects like obstacle-avoiding robots, distance measurement applications, and autonomous navigation systems. Requires careful wiring and timing-sensitive code, making it best-suited for intermediate-level projects.",
    "voltage": "5V",
    "pins": [
        { "name": "VCC", "connection": "Power", "description": "Connect to Arduino 5V" },
        { "name": "Trig", "connection": "Digital (Output)", "description": "Trigger pin - send a 10μs pulse to start measurement" },
        { "name": "Echo", "connection": "Digital (Input)", "description": "Echo pin - stays HIGH for the duration of the sound's travel time" },
        { "name": "GND", "connection": "Ground", "description": "Connect to Arduino GND" }
    ],
    "tags": ["distance", "sonar", "ultrasonic", "proximity", "ranging"],
    "code": {
        "arduino": "// HC-SR04 Ultrasonic Distance Sensor\n#define TRIG_PIN 9\n#define ECHO_PIN 10\n\nlong duration;\nint distance;\n\nvoid setup() {\n  pinMode(TRIG_PIN, OUTPUT);\n  pinMode(ECHO_PIN, INPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Clear the trigger pin\n  digitalWrite(TRIG_PIN, LOW);\n  delayMicroseconds(2);\n\n  // Send a 10 microsecond pulse\n  digitalWrite(TRIG_PIN, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(TRIG_PIN, LOW);\n\n  // Read the echo pin (travel time in microseconds)\n  duration = pulseIn(ECHO_PIN, HIGH);\n\n  // Calculate distance in cm\n  // Speed of sound is ~343m/s or 0.0343 cm/us. \n  // Divided by 2 because the sound goes out and back.\n  distance = duration * 0.0343 / 2;\n\n  Serial.print(\"Distance: \");\n  Serial.print(distance);\n  Serial.println(\" cm\");\n\n  delay(200);\n}",
        "notes": "Distance calculation is based on the formula: $Distance = \\frac{Time \\times Speed\\ of\\ Sound}{2}$. At sea level, $Speed\\ of\\ Sound \\approx 343\\ m/s$."
    },
    "tips": [
        "Soft materials like cloth or sponges absorb sound and may give false readings",
        "The sensor works best when pointing at flat, hard surfaces at a 90° angle",
        "Keep the 'eyes' of the sensor clear of obstructions to avoid internal reflections",
        "Avoid using 'delay()' for timing-sensitive robot logic; use 'millis()' or a library like NewPing",
        "The sensing cone is approximately 15 degrees; keep this in mind for narrow passageways",
        "If you get constant 0 or 3000 readings, check your wiring or ensure the sensor isn't pointed at thin air beyond 4 meters",
        "Temperature affects the speed of sound; for extreme precision, add a DHT11/22 sensor to compensate"
    ]
},
{
    "id": 39,
    "name": "HW-131 Breadboard Power Supply",
    "category": "power",
    "description": "A plug-and-play breadboard power supply module (HW-131) specifically designed for MB102 full-size or half-size breadboards, providing regulated power distribution without complex external wiring. Features a 6.5V-12V DC barrel jack input (center-positive) and two independent output channels, each independently selectable to provide either 3.3V or 5V through physical jumper headers. Dual-channel design enables simultaneous operation of circuits requiring different voltage levels—one side can power 3.3V logic while the other supplies 5V to servos or other components. Maximum output current is approximately 700mA total across both channels. The module plugs directly into breadboard power rails, instantly providing cleanly regulated power to your entire breadboard circuit without needing separate adapters or external wiring harnesses. Also includes a USB-A port for charging external devices or accepting 5V input from standard USB power supplies. The physical power switch is latching—click once to turn on, click again to turn off. Ideal for electronics prototyping and education where quick power distribution is essential. Includes onboard LED indicators showing power status for both voltage rails. Makes breadboard prototyping significantly simpler by eliminating the need for individual voltage regulator modules and external wiring.",
    "voltage": "Input: 6.5V - 12V | Output: 3.3V or 5V",
    "pins": [
        { "name": "DC Jack", "connection": "Input", "description": "6.5V to 12V DC center-positive barrel jack" },
        { "name": "USB Port", "connection": "Input/Output", "description": "Can provide 5V output to devices or take 5V input" },
        { "name": "Rail Pins", "connection": "Output", "description": "Two sets of pins on the bottom that plug directly into breadboard power rails" },
        { "name": "Jumpers", "connection": "Control", "description": "Configures each side of the breadboard to 3.3V, 5V, or OFF (0V)" }
    ],
    "tags": ["power", "regulator", "breadboard", "MB102", "3.3V", "5V"],
    "code": {
        "arduino": "// The HW-131 is a hardware module and does not require code to run.\n// Below is a simple script to monitor the power rail voltage (via divider).\n\n#define MONITOR_PIN A0\n\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(\"HW-131 Power Monitor Initialized\");\n}\n\nvoid loop() {\n  int rawValue = analogRead(MONITOR_PIN);\n  // Convert raw value to voltage (assuming a 5V reference)\n  float voltage = rawValue * (5.0 / 1023.0);\n  \n  Serial.print(\"Detected Rail Voltage: \");\n  Serial.print(voltage);\n  Serial.println(\" V\");\n  \n  delay(1000);\n}",
        "notes": "No programming required. Ensure your jumpers are set to the correct voltage (3.3V or 5V) before powering your circuit to avoid damaging sensitive components."
    },
    "tips": [
        "The module is specifically sized for MB102 'Full Size' or 'Half Size' breadboards",
        "You can have 5V on one rail and 3.3V on the other simultaneously",
        "The USB-A port can be used to power a phone or a 5V peripheral while the board is active",
        "Maximum current output is approximately 700mA; don't try to run large DC motors directly through it",
        "The power button is latching; if your LEDs aren't on, make sure the button is clicked down",
        "The input voltage must be at least 1V higher than the desired output (e.g., use 9V for 5V output)",
        "Check for short circuits on your breadboard if the module's power LED flickers or turns off"
    ]
},
{
    "id": 40,
    "name": "DS3231 Precision Real-Time Clock",
    "category": "module",
    "description": "High-precision Real-Time Clock (RTC) module featuring an integrated temperature-compensated crystal oscillator (TCXO) maintaining accurate timekeeping through temperature variations. Keeps track of seconds, minutes, hours, day-of-week, date, month, and year with automatic leap-year compensation through the year 2100. Uses I2C communication protocol (two wires: SDA and SCL) for simple integration with Arduino. Includes a CR2032 coin-cell battery backup ensuring the clock continues running even when main power is disconnected—the battery can maintain accurate time for several years when no power is applied. Features programmable alarm functionality with two independent time-of-day alarms and a square-wave output pin capable of producing precise 1Hz, 4kHz, 8kHz, or 32kHz signals for timing applications. Temperature accuracy is ±2°C due to the integrated temperature sensor, and timekeeping accuracy is typically ±2 minutes per year. Essential for data logging applications where sensor readings must be timestamped, time-based automation, and any project requiring accurate time tracking when power is intermittently available. The battery backup eliminates the need to reset the time after power failures. Perfect for environmental monitoring stations, weather data loggers, security systems with time-sensitive recording, and autonomous vehicles that must track elapsed time.",
    "voltage": "3.3V - 5.5V",
    "pins": [
        { "name": "VCC", "connection": "Power", "description": "Connect to Arduino 5V or 3.3V" },
        { "name": "GND", "connection": "Ground", "description": "Connect to Arduino GND" },
        { "name": "SDA", "connection": "I2C Data", "description": "Serial Data - Connect to A4 (Uno) or SDA pin" },
        { "name": "SCL", "connection": "I2C Clock", "description": "Serial Clock - Connect to A5 (Uno) or SCL pin" }
    ],
    "tags": ["time", "RTC", "I2C", "clock", "calendar", "precision"],
    "code": {
        "arduino": "// DS3231 RTC Basic Time Read (Requires RTClib)\n#include <Wire.h>\n#include \"RTClib.h\"\n\nRTC_DS3231 rtc;\n\nvoid setup() {\n  Serial.begin(9600);\n\n  if (!rtc.begin()) {\n    Serial.println(\"Couldn't find RTC\");\n    while (1);\n  }\n\n  if (rtc.lostPower()) {\n    Serial.println(\"RTC lost power, setting the time!\");\n    // Sets the RTC to the date & time this sketch was compiled\n    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));\n  }\n}\n\nvoid loop() {\n  DateTime now = rtc.now();\n\n  Serial.print(now.year(), DEC);\n  Serial.print('/');\n  Serial.print(now.month(), DEC);\n  Serial.print('/');\n  Serial.print(now.day(), DEC);\n  Serial.print(\" \");\n  Serial.print(now.hour(), DEC);\n  Serial.print(':');\n  Serial.print(now.minute(), DEC);\n  Serial.print(':');\n  Serial.println(now.second(), DEC);\n\n  delay(1000);\n}",
        "notes": "Uses the I2C protocol. Default address is usually 0x68. Requires a CR2032 coin cell battery to keep time while the Arduino is powered off."
    },
    "tips": [
        "The DS3231 also contains a digital temperature sensor accessible via code",
        "Includes two programmable time-of-day alarms",
        "The SQW pin can be programmed to output a precise square wave (1Hz, 4kHz, 8kHz, or 32kHz)",
        "Crucial for data loggers where you need to timestamp sensor readings accurately",
        "If using with 3.3V logic (like ESP32), ensure your module's pull-up resistors are compatible",
        "Check the battery voltage if the time starts resetting; a CR2032 should last several years",
        "Avoid using the 'Basic' DS1307 if your project will be in an environment with fluctuating temperatures"
    ]
},
{
    "id": 41,
    "name": "Soil Moisture Sensor (FC-28 / YL-69)",
    "category": "sensor",
    "description": "Soil moisture detection and measurement system consisting of two metal probe electrodes that measure soil conductivity as a proxy for water content. Wetter soil conducts electricity better (lower resistance), while dry soil has very high resistance. The two probes pass a small current through the soil between them, and the resulting resistance changes proportionally to moisture content. A built-in comparator circuit (the 'driver' board) provides both analog and digital outputs: the analog output (A0) returns 0-1023 values proportional to soil conductivity where 0 is completely dry and 1023 is fully saturated. The digital output (D0) provides a threshold-based trigger—when moisture exceeds a setpoint (adjustable via onboard potentiometer), the output goes LOW. Ideal for automatic plant watering systems, greenhouse humidity control, and soil condition monitoring in agricultural applications. Susceptible to corrosion (electrolysis) if powered continuously, so best practice is to supply power through a digital pin, powering the sensor only during measurement, then immediately taking a reading before deactivating power. The analog output requires calibration by testing in bone-dry soil and freshly-watered soil to establish your specific min/max values accounting for local soil mineral content and composition.",
    "voltage": "3.3V - 5V",
    "pins": [
        { "name": "VCC", "connection": "Power", "description": "Connect to Arduino 5V or 3.3V" },
        { "name": "GND", "connection": "Ground", "description": "Connect to Arduino GND" },
        { "name": "D0", "connection": "Digital", "description": "Digital output - triggers LOW/HIGH based on potentiometer threshold" },
        { "name": "A0", "connection": "Analog", "description": "Analog output - 0 (wet) to 1023 (dry) proportional to moisture" }
    ],
    "tags": ["soil", "moisture", "hygrometer", "agriculture", "analog"],
    "code": {
        "arduino": "// Soil Moisture Sensor - Analog Reading\n#define SENSOR_PIN A0\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(SENSOR_PIN, INPUT);\n  Serial.println(\"Soil Moisture Sensor Ready\");\n}\n\nvoid loop() {\n  int rawValue = analogRead(SENSOR_PIN);\n  \n  // Convert to percentage: 1023 is bone dry, 0 is submerged in water\n  // Note: Calibration is required for your specific soil type\n  int moisturePercent = map(rawValue, 1023, 0, 0, 100);\n  moisturePercent = constrain(moisturePercent, 0, 100);\n\n  Serial.print(\"Raw Value: \");\n  Serial.print(rawValue);\n  Serial.print(\" | Moisture: \");\n  Serial.print(moisturePercent);\n  Serial.println(\"%\");\n\n  delay(1000);\n}",
        "notes": "The analog output (A0) is typically 'inverted' logically: higher values mean drier soil. Use the `map()` function to turn the raw 0-1023 range into a 0-100% scale."
    },
    "tips": [
        "The probes are prone to corrosion (electrolysis) if powered constantly. To extend life, power the VCC pin from a digital pin and only turn it ON during a reading",
        "The blue potentiometer on the module adjusts the sensitivity for the Digital Output (D0) LED and pin",
        "Resistive sensors are great for short-term projects; for long-term outdoor use, consider a 'Capacitive' moisture sensor which doesn't corrode",
        "Calibrate by taking a reading in 'completely dry' soil and another in 'freshly watered' soil to find your actual min/max values",
        "Ensure the probes are pushed firmly into the soil; air gaps will cause wildly inconsistent readings",
        "The two pins on the probe itself are non-polarized—you can connect them to the driver module in either direction",
        "Keep the electronic module (driver) dry! Only the two long metal probes should ever touch the soil or water"
    ]
},
{
    "id": 42,
    "name": "MPU-6050 (Accelerometer + Gyroscope)",
    "category": "sensor",
    "description": "Six-axis motion-tracking IMU (Inertial Measurement Unit) combining a 3-axis MEMS accelerometer and 3-axis MEMS gyroscope in a single integrated circuit. The accelerometer measures linear acceleration in three dimensions plus gravitational force, allowing orientation/tilt detection. The gyroscope measures rotational velocity (angular motion rate) in all three axes, allowing detection of spinning and rotation. Together they enable sophisticated motion sensing applications including gesture recognition, activity detection, and orientation tracking. Features an onboard Digital Motion Processor (DMP) that performs real-time motion calculations—specifically quaternion (attitude) calculation which outputs the device's exact 3D orientation in space without requiring manual Kalman filtering. I2C communication interface (two wires) with configurable I2C address (0x68 or 0x69 via AD0 pin), allowing two devices on the same bus. Digital interrupt output signals when new data is available for efficient interrupt-driven reading. Gyroscopes naturally drift over time; the DMP partially compensates using accelerometer data fusion. Temperature sensor built-in for thermal calibration. Essential for drones, balancing robots, motion-capture systems, and any application requiring precise 3D orientation or motion tracking. Requires careful sensor calibration at startup while stationary to establish baseline values.",
    "voltage": "3V - 5V (onboard regulator included)",
    "pins": [
        { "name": "VCC", "connection": "Power", "description": "Connect to Arduino 5V" },
        { "name": "GND", "connection": "Ground", "description": "Connect to Arduino GND" },
        { "name": "SCL", "connection": "I2C Clock", "description": "Serial Clock - Connect to A5 (Uno) or SCL pin" },
        { "name": "SDA", "connection": "I2C Data", "description": "Serial Data - Connect to A4 (Uno) or SDA pin" },
        { "name": "AD0", "connection": "I2C Address", "description": "I2C Address Select - Leave disconnected for 0x68, connect to 3.3V for 0x69" },
        { "name": "INT", "connection": "Digital (Input)", "description": "Interrupt pin to signal the Arduino when data is ready" }
    ],
    "tags": ["IMU", "accelerometer", "gyroscope", "motion", "tilt", "I2C"],
    "code": {
        "arduino": "// MPU-6050 Basic Reading (Requires Adafruit_MPU6050 library)\n#include <Adafruit_MPU6050.h>\n#include <Adafruit_Sensor.h>\n#include <Wire.h>\n\nAdafruit_MPU6050 mpu;\n\nvoid setup() {\n  Serial.begin(115200);\n\n  if (!mpu.begin()) {\n    Serial.println(\"Failed to find MPU6050 chip\");\n    while (1) yield();\n  }\n\n  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);\n  mpu.setGyroRange(MPU6050_RANGE_500_DEG);\n  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);\n}\n\nvoid loop() {\n  sensors_event_t a, g, temp;\n  mpu.getEvent(&a, &g, &temp);\n\n  Serial.print(\"Accel X: \"); Serial.print(a.acceleration.x);\n  Serial.print(\" | Gyro X: \"); Serial.print(g.gyro.x);\n  Serial.println(\" rad/s\");\n\n  delay(100);\n}",
        "notes": "The accelerometer measures gravity ($9.81 m/s^2$). When sitting flat, the Z-axis should read ~9.8, while X and Y read ~0. Communications happen over I2C (Address 0x68)."
    },
    "tips": [
        "Gyroscopes naturally 'drift' over time; for stable orientation, you must combine accel and gyro data using a Complementary or Kalman filter",
        "The sensor is extremely sensitive; even vibrations from a nearby motor can 'noise up' your readings",
        "The chip also includes a temperature sensor, which can be used to compensate for thermal drift in the gyro",
        "For the best results, the sensor should be calibrated at startup while sitting perfectly still",
        "Use the AD0 pin to change the I2C address if you need to use two MPU-6050s on the same bus",
        "Great for drones, self-balancing robots, and handheld game controllers",
        "Make sure to mount it securely; if the sensor wobbles relative to the robot, your logic will get very confused"
    ]
},
{
    "id": 43,
    "name": "Micro SD Card Module",
    "category": "storage",
    "description": "An SPI-based interface for reading and writing data to Micro SD cards. Most modules include an onboard 3.3V regulator and level shifter, making them compatible with both 3.3V and 5V microcontrollers.",
    "voltage": "3.3V or 5V (Check for onboard regulator)",
    "pins": [
        { "name": "GND", "connection": "Ground", "description": "Connect to Arduino GND" },
        { "name": "VCC", "connection": "Power", "description": "Connect to 5V (if regulator is present) or 3.3V" },
        { "name": "MISO", "connection": "SPI Data", "description": "Master In Slave Out - Connect to Digital 12 (Uno)" },
        { "name": "MOSI", "connection": "SPI Data", "description": "Master Out Slave In - Connect to Digital 11 (Uno)" },
        { "name": "SCK", "connection": "SPI Clock", "description": "Serial Clock - Connect to Digital 13 (Uno)" },
        { "name": "CS", "connection": "Digital (Output)", "description": "Chip Select - Usually connected to Digital 4 or 10" }
    ],
    "tags": ["storage", "SD", "logging", "SPI", "memory", "data"],
    "code": {
        "arduino": "// Micro SD Card - Write Example\n#include <SPI.h>\n#include <SD.h>\n\nconst int chipSelect = 4;\n\nvoid setup() {\n  Serial.begin(9600);\n  \n  Serial.print(\"Initializing SD card...\");\n  if (!SD.begin(chipSelect)) {\n    Serial.println(\"Initialization failed!\");\n    return;\n  }\n  Serial.println(\"Initialization done.\");\n\n  // Create/Open file\n  File dataFile = SD.open(\"test.txt\", FILE_WRITE);\n\n  if (dataFile) {\n    dataFile.println(\"Hello, SD card! Timestamp: \" + String(millis()));\n    dataFile.close();\n    Serial.println(\"Data written successfully.\");\n  } else {\n    Serial.println(\"Error opening test.txt\");\n  }\n}\n\nvoid loop() {\n  // Nothing to repeat here\n}",
        "notes": "Communication is done via SPI. Ensure your SD card is formatted to FAT16 or FAT32. High-capacity cards (SDXC) or cards formatted to exFAT often will not work without specialized libraries."
    },
    "tips": [
        "The SD card must be formatted to FAT16 or FAT32; use the official 'SD Memory Card Formatter' tool for best results",
        "Many modules use the 8.3 filename format (e.g., 'LOGDATA1.CSV'), so keep your filenames short",
        "SPI pins vary by board: Uno (11,12,13), Mega (50,51,52), Leonardo (ICSP header only)",
        "Always call 'file.close()' after writing data, or you risk corrupting the file or losing your progress",
        "SD cards are power-hungry during write operations; if you get erratic errors, try a dedicated power source",
        "If the card won't initialize, double-check your Chip Select (CS) pin matches the number in your code",
        "For long-term logging, combine this with the DS3231 RTC (ID 40) so your data points have actual timestamps"
    ]
},
{
    "id": 44,
    "name": "Water Level / Raindrop Sensor",
    "category": "sensor",
    "description": "A simple analog sensor that detects water presence, level, or rainfall. It features a series of parallel wires that act as a variable resistor: when the sensor is submerged or wet, the resistance decreases, increasing the output voltage.",
    "voltage": "3.3V - 5V",
    "pins": [
        { "name": "+", "connection": "Power", "description": "Connect to Arduino 5V or 3.3V" },
        { "name": "-", "connection": "Ground", "description": "Connect to Arduino GND" },
        { "name": "S", "connection": "Analog", "description": "Analog output - provides a signal between 0 (dry) and ~1023 (fully submerged)" }
    ],
    "tags": ["water", "liquid", "level", "rain", "analog", "leak"],
    "code": {
        "arduino": "// Water Level Sensor - Basic Reading\n#define SENSOR_PIN A0\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(SENSOR_PIN, INPUT);\n  Serial.println(\"Water Level Sensor Initialized\");\n}\n\nvoid loop() {\n  int sensorValue = analogRead(SENSOR_PIN);\n\n  Serial.print(\"Water Level Value: \");\n  Serial.println(sensorValue);\n\n  if (sensorValue > 500) {\n    Serial.println(\"Status: High Water Level / Heavy Rain\");\n  } else if (sensorValue > 50) {\n    Serial.println(\"Status: Moisture Detected / Shallow Water\");\n  } else {\n    Serial.println(\"Status: Dry\");\n  }\n\n  delay(500);\n}",
        "notes": "The output is analog. Unlike the soil sensor, a 'higher' value typically represents 'more' water. Calibration is necessary as the conductivity depends on the purity of the water."
    },
    "tips": [
        "Like the soil sensor, the traces are subject to corrosion. To prevent this, only power the sensor (using a digital pin as VCC) right before taking a reading",
        "The sensor is not intended for deep submersion; only the metal trace area should be exposed to liquid—the top circuitry must stay dry",
        "Distilled water is non-conductive and may not trigger the sensor; tap water or rainwater works perfectly due to mineral content",
        "Great for detecting leaks under a sink or in a basement",
        "Can be used as a simple depth gauge in a small tank, though it is not linear enough for scientific measurements",
        "If used for rain detection, mounting it at a slight angle helps water run off, so the sensor 'dries' faster after the rain stops",
        "Clean the traces periodically with alcohol to remove oxidation or mineral buildup"
    ]
},
{
    "id": 45,
    "name": "MP1584EN DC-DC Buck Converter",
    "category": "power",
    "description": "An ultra-small, high-frequency step-down switching regulator. It converts a higher input voltage to a lower output voltage with up to 96% efficiency. Features an adjustable output via an onboard miniature potentiometer.",
    "voltage": "Input: 4.5V - 28V | Output: 0.8V - 20V",
    "pins": [
        { "name": "IN+", "connection": "Input", "description": "Positive input voltage (must be higher than desired output)" },
        { "name": "IN-", "connection": "Input", "description": "Negative/Ground input" },
        { "name": "OUT+", "connection": "Output", "description": "Regulated positive output voltage" },
        { "name": "OUT-", "connection": "Output", "description": "Common ground output" }
    ],
    "tags": ["power", "buck", "regulator", "step-down", "efficiency", "converter"],
    "code": {
        "arduino": "// The MP1584EN is a hardware power module and does not use code.\n// IMPORTANT: Always set the output voltage with a multimeter BEFORE\n// connecting it to your Arduino or sensitive components.\n\n/* \n  Safety Check Workflow:\n  1. Connect Input Power (e.g., 12V Battery) to IN+ and IN-.\n  2. Use a Multimeter on the OUT+ and OUT- pins.\n  3. Turn the tiny brass screw (potentiometer) until the meter reads 5.0V.\n  4. Only THEN connect the OUT pins to your project.\n*/",
        "notes": "This is a 'Buck' converter, meaning it can only step voltage DOWN. It cannot produce a voltage higher than the input. Maximum current is 3A, but for continuous use above 1.5A, a heatsink is recommended."
    },
    "tips": [
        "The tiny potentiometer is multi-turn; you might need to rotate it many times before the voltage starts to change",
        "Counter-clockwise usually decreases the voltage, but some versions of this board vary—always verify with a multimeter",
        "Switching regulators like this are much more efficient than 'Linear' regulators (like the LM7805), meaning your batteries will last much longer",
        "The high switching frequency (1.5MHz) allows it to be very small, but it can introduce 'noise' into sensitive analog radio or audio circuits",
        "If the module gets hot to the touch, you are likely pulling too much current; check for shorts or reduce the load",
        "Input voltage must be at least 1.5V higher than the desired output voltage to maintain regulation",
        "Great for powering 5V projects from 12V car batteries or 3S/4S LiPo drone batteries"
    ]
},
    {
        id: 46,
        name: "DC Motor (Generic)",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/711-00.jpg",
        category: "output",
        description: "Generic brushed DC motor (130/180/370 types common in Arduino kits). Requires a motor driver — never connect directly to an Arduino pin. Speed controlled via PWM, direction via an H-bridge driver.",
        voltage: "3V–12V (type dependent)",
        pins: [
            { name: "M+", connection: "Motor terminal", description: "Positive motor terminal — connect to driver output" },
            { name: "M-", connection: "Motor terminal", description: "Negative motor terminal — connect to driver output" }
        ],
        tags: ["motor", "DC", "PWM", "brushed"],
        warnings: [
            "NEVER connect directly to an Arduino digital pin — motors draw 200mA+ which will damage the ATmega chip",
            "Always add a 100nF ceramic capacitor across the motor terminals to suppress EMI",
            "Include a flyback diode (1N4007) across the motor if not using a dedicated driver module"
        ],
        tips: [
            "Use PWM (analogWrite) for speed control: 0 = stop, 255 = full speed",
            "The L298N, TB6612FNG, and L9110S are common driver choices",
            "Add a 100nF ceramic cap directly across the motor terminals to reduce electrical noise on sensor lines"
        ]
    },
    {
        id: 47,
        name: "L298N Dual Motor Driver",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2308-00.jpg",
        category: "module",
        description: "Popular dual H-bridge motor driver module. Controls 2 DC motors independently (speed + direction) or 1 stepper motor. Onboard 5V regulator can power the Arduino when motor supply is 7V+. Logic: 5V, motor: 6V–35V, max 2A per channel.",
        voltage: "6V–35V (motor), 5V (logic)",
        pins: [
            { name: "ENA",  connection: "PWM", description: "Enable Motor A — PWM for speed (HIGH = full speed)" },
            { name: "IN1",  connection: "Digital", description: "Motor A direction input 1" },
            { name: "IN2",  connection: "Digital", description: "Motor A direction input 2" },
            { name: "IN3",  connection: "Digital", description: "Motor B direction input 1" },
            { name: "IN4",  connection: "Digital", description: "Motor B direction input 2" },
            { name: "ENB",  connection: "PWM", description: "Enable Motor B — PWM for speed" },
            { name: "+12V", connection: "Power", description: "Motor power supply (6V–35V)" },
            { name: "GND",  connection: "Ground", description: "Common ground" },
            { name: "5V",   connection: "Power Output", description: "5V output to power Arduino when motor supply > 7V" }
        ],
        tags: ["motor", "driver", "H-bridge", "L298N", "stepper"],
        warnings: [
            "Remove the 5V jumper if supplying 5V to that pin from the Arduino — backfeeding the regulator will cause damage",
            "The L298N drops ~2V across the H-bridge, so a 6V supply only delivers ~4V to the motor"
        ],
        tips: [
            "IN1=HIGH, IN2=LOW → Motor A forward; IN1=LOW, IN2=HIGH → Motor A reverse",
            "Use analogWrite on ENA/ENB for PWM speed control",
            "Install 100nF bypass capacitors near each motor terminal to reduce noise on other sensors",
            "For stepper motors, treat the two coil pairs as Motor A and Motor B channels"
        ]
    },
    {
        id: 48,
        name: "SG90 9g Servo Motor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/155-00.jpg",
        category: "output",
        description: "Micro 9g servo with 180° rotation range. Controlled by 50Hz PWM pulses (1–2ms). Use the Arduino Servo library for simple angle control. Torque: 1.8 kg·cm, speed: 0.1s/60°.",
        voltage: "4.8V–6V",
        pins: [
            { name: "Brown",  connection: "Ground", description: "GND — connect to Arduino GND" },
            { name: "Red",    connection: "Power", description: "VCC — 5V (use dedicated supply for multiple servos)" },
            { name: "Orange", connection: "PWM", description: "Signal — connect to any digital pin" }
        ],
        tags: ["servo", "PWM", "motor", "angle", "SG90"],
        warnings: [
            "Do not power more than 1–2 servos from the Arduino 5V pin — current draw can brown-out or reset the board",
            "Forcing the servo past its mechanical stop will strip the plastic gears"
        ],
        tips: [
            "Use the built-in Servo library: #include <Servo.h>",
            "myServo.write(0) = fully left, write(90) = center, write(180) = fully right",
            "Sweep in small increments with a short delay between steps for smooth motion",
            "Power multiple servos from a dedicated 5V BEC, sharing GND with the Arduino"
        ]
    },
    {
        id: 49,
        name: "28BYJ-48 Stepper Motor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/324-00.jpg",
        category: "output",
        description: "Compact 5V unipolar stepper motor with 64:1 gear reduction (2048 steps per full revolution). Low torque but very precise positioning. Almost always paired with the ULN2003 driver board.",
        voltage: "5V",
        pins: [
            { name: "Blue (1)",   connection: "Coil", description: "Coil A1 — connects to ULN2003 driver" },
            { name: "Pink (2)",   connection: "Coil", description: "Coil A2 — connects to ULN2003 driver" },
            { name: "Yellow (3)", connection: "Coil", description: "Coil B1 — connects to ULN2003 driver" },
            { name: "Orange (4)", connection: "Coil", description: "Coil B2 — connects to ULN2003 driver" },
            { name: "Red (5)",    connection: "Power", description: "Common 5V center tap" }
        ],
        tags: ["stepper", "motor", "precision", "28BYJ-48", "gear"],
        tips: [
            "Always drive with the ULN2003 driver board (module ID 50) — never direct from Arduino pins",
            "Use AccelStepper library for smooth acceleration and deceleration profiles",
            "De-energize coils when not moving (set all IN pins LOW) to reduce heat and power draw",
            "512 half-steps = 1 full revolution due to the 64:1 gearing"
        ]
    },
    {
        id: 50,
        name: "ULN2003 Stepper Driver Board",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/324-00.jpg",
        category: "module",
        description: "Darlington transistor array driver board for the 28BYJ-48 stepper motor. Accepts logic-level inputs from Arduino and drives the 4 motor coils. Onboard LEDs indicate which coils are active. Direct JST connector for the 28BYJ-48.",
        voltage: "5V (logic and motor)",
        pins: [
            { name: "IN1", connection: "Digital", description: "Coil driver input 1 — connect to Arduino digital pin" },
            { name: "IN2", connection: "Digital", description: "Coil driver input 2 — connect to Arduino digital pin" },
            { name: "IN3", connection: "Digital", description: "Coil driver input 3 — connect to Arduino digital pin" },
            { name: "IN4", connection: "Digital", description: "Coil driver input 4 — connect to Arduino digital pin" },
            { name: "VCC (+)", connection: "Power", description: "Motor power supply — 5V for 28BYJ-48" },
            { name: "GND (-)", connection: "Ground", description: "Common ground" }
        ],
        tags: ["stepper", "driver", "ULN2003", "darlington"],
        tips: [
            "Use Arduino pins 8,9,10,11 for straightforward wiring",
            "The onboard LEDs show active coils — very useful for debugging step sequences",
            "Stepper(4, 8, 10, 9, 11) in the Stepper library — note the interleaved pin order for half-step",
            "Use the AccelStepper library for smoother, faster motion with acceleration curves"
        ]
    },
    {
        id: 51,
        name: "A4988 Stepper Motor Driver",
        imageUrl: "",
        category: "module",
        description: "Microstepping driver for bipolar stepper motors (NEMA 17, NEMA 23, etc). Simple STEP/DIR interface — one pulse on STEP = one step. Up to 1/16 microstepping via MS pins. Motor: 8V–35V, up to 2A per coil. Used in 3D printers and CNC machines.",
        voltage: "8V–35V (motor), 3.3V–5V (logic)",
        pins: [
            { name: "VMOT",    connection: "Power", description: "Motor power (8V–35V) — add 100µF capacitor here!" },
            { name: "GND",     connection: "Ground", description: "Motor power ground" },
            { name: "VDD",     connection: "Power", description: "Logic supply (3.3V or 5V)" },
            { name: "GND",     connection: "Ground", description: "Logic ground — connect to Arduino GND" },
            { name: "STEP",    connection: "Digital", description: "Step input — one rising edge = one motor step" },
            { name: "DIR",     connection: "Digital", description: "Direction — HIGH = clockwise, LOW = counter-clockwise" },
            { name: "ENABLE",  connection: "Digital", description: "Active LOW enable — connect to GND or control pin" },
            { name: "MS1/MS2/MS3", connection: "Digital", description: "Microstepping select: all LOW = full step, all HIGH = 1/16 step" },
            { name: "1A/1B/2A/2B", connection: "Motor Coil", description: "Bipolar stepper motor coil outputs" }
        ],
        tags: ["stepper", "driver", "A4988", "NEMA17", "microstepping", "CNC", "3D printer"],
        warnings: [
            "CRITICAL: Always connect a 100µF capacitor between VMOT and GND — back-EMF spikes will destroy the chip without it",
            "Set current limit via the onboard potentiometer BEFORE connecting the motor",
            "NEVER disconnect the motor while powered — the voltage spike will instantly kill the driver chip"
        ],
        tips: [
            "Current limit: V_ref = I_max × 8 × R_sense. Measure VREF at the potentiometer wiper with a multimeter",
            "Add a small heatsink for currents above 1A continuous",
            "STEP/DIR interface is compatible with GRBL firmware and CNC shields",
            "MS1/MS2/MS3 all HIGH = 1/16 microstepping for smoother, quieter motion"
        ]
    },
    {
        id: 52,
        name: "TB6612FNG Dual Motor Driver",
        imageUrl: "",
        category: "module",
        description: "High-efficiency dual H-bridge motor driver. Only 0.5V voltage drop (vs 2V for L298N), so motors receive nearly the full supply voltage. Controls 2 DC motors or 1 stepper. Motor: 4.5V–13.5V, 1.2A continuous (3.2A peak). Logic: 2.7V–5.5V.",
        voltage: "4.5V–13.5V (motor), 2.7V–5.5V (logic)",
        pins: [
            { name: "PWMA", connection: "PWM", description: "Motor A speed (PWM or HIGH for full speed)" },
            { name: "AIN1", connection: "Digital", description: "Motor A direction input 1" },
            { name: "AIN2", connection: "Digital", description: "Motor A direction input 2" },
            { name: "STBY", connection: "Digital", description: "Standby — MUST be HIGH to enable outputs" },
            { name: "BIN1", connection: "Digital", description: "Motor B direction input 1" },
            { name: "BIN2", connection: "Digital", description: "Motor B direction input 2" },
            { name: "PWMB", connection: "PWM", description: "Motor B speed control" },
            { name: "VM",   connection: "Power", description: "Motor supply (4.5V–13.5V)" },
            { name: "VCC",  connection: "Power", description: "Logic supply (2.7V–5.5V)" },
            { name: "GND",  connection: "Ground", description: "Common ground" }
        ],
        tags: ["motor", "driver", "TB6612", "H-bridge", "dual"],
        tips: [
            "Always pull STBY HIGH to enable outputs — it is not internally pulled up",
            "AIN1=HIGH, AIN2=LOW = forward; AIN1=LOW, AIN2=HIGH = reverse; both same level = brake",
            "Much more efficient than L298N — motor receives nearly full supply voltage",
            "SparkFun and Adafruit have convenient libraries for this driver"
        ]
    },
    {
        id: 53,
        name: "Vibration Motor Module",
        imageUrl: "",
        category: "output",
        description: "Coin/disc eccentric rotating mass (ERM) vibration motor on a breakout board. Produces tactile/haptic feedback. Drive via the onboard transistor from an Arduino PWM or digital pin. Supply 3V–5V through the module's VCC/IN pins.",
        voltage: "3V–5V",
        pins: [
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "VCC", connection: "Power", description: "3V–5V motor supply" },
            { name: "IN",  connection: "Digital/PWM", description: "Signal input — HIGH activates vibration" }
        ],
        tags: ["haptic", "vibration", "feedback", "motor", "ERM"],
        tips: [
            "Use PWM on IN for variable intensity control",
            "Add 100nF bypass capacitor across the motor terminals to suppress noise",
            "Pulse in short bursts rather than continuous operation for longer lifespan",
            "Great for notification alerts in wearable or handheld projects"
        ]
    },
    {
        id: 54,
        name: "L9110S Dual Motor Driver",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2928-00.jpg",
        category: "module",
        description: "Compact dual H-bridge driver for small DC motors and fans. Controls 2 motors independently. Motor voltage: 2.5V–12V, up to 800mA continuous per channel. Popular in budget robot car kits. Each motor has a forward and reverse PWM input.",
        voltage: "2.5V–12V (motor), 2.5V–5V (logic)",
        pins: [
            { name: "A-1A", connection: "Digital/PWM", description: "Motor A forward (HIGH = forward, PWM for speed)" },
            { name: "A-1B", connection: "Digital/PWM", description: "Motor A reverse (HIGH = reverse, PWM for speed)" },
            { name: "B-1A", connection: "Digital/PWM", description: "Motor B forward" },
            { name: "B-1B", connection: "Digital/PWM", description: "Motor B reverse" },
            { name: "VCC",  connection: "Power", description: "Shared motor and logic power (2.5V–12V)" },
            { name: "GND",  connection: "Ground", description: "Common ground" }
        ],
        tags: ["motor", "driver", "L9110S", "H-bridge", "robot car"],
        tips: [
            "A-1A=HIGH, A-1B=LOW = Motor A forward; A-1A=LOW, A-1B=HIGH = reverse",
            "Use analogWrite on either pin for PWM speed control",
            "Smaller and cheaper than L298N — ideal for lightweight robot cars",
            "VCC powers both logic and motors, so add decoupling capacitors near the chip"
        ]
    },
    {
        id: 55,
        name: "HC-05 Bluetooth Module",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1588-00.jpg",
        category: "module",
        description: "Classic SPP (Serial Port Profile) Bluetooth 2.0 module. Creates a wireless serial link between Arduino and a phone or PC. Default baud rate: 9600. Configurable via AT commands. Range: ~10m. Note: RXD pin is 3.3V logic.",
        voltage: "3.3V–5V (VCC), 3.3V logic on TX/RX",
        pins: [
            { name: "VCC",    connection: "Power", description: "Connect to Arduino 5V" },
            { name: "GND",    connection: "Ground", description: "Connect to Arduino GND" },
            { name: "TXD",    connection: "Digital (TX)", description: "Module TX → Arduino RX (add 1kΩ/2kΩ voltage divider to protect 3.3V logic)" },
            { name: "RXD",    connection: "Digital (RX)", description: "Module RX → Arduino TX (3.3V — use voltage divider!)" },
            { name: "STATE",  connection: "Digital Output", description: "HIGH when connected, slow blink when searching" },
            { name: "KEY/EN", connection: "Digital", description: "Hold HIGH at power-up to enter AT command mode (38400 baud)" }
        ],
        tags: ["bluetooth", "wireless", "serial", "HC-05", "SPP"],
        warnings: [
            "RXD is 3.3V logic — use a 1kΩ/2kΩ voltage divider on the wire from Arduino TX (5V) to RXD",
            "Disconnect the module before uploading sketches — it shares the hardware UART on pins 0/1"
        ],
        tips: [
            "Use SoftwareSerial on pins 10/11 to avoid conflicts with the hardware serial port",
            "Enter AT mode by pulling KEY/EN HIGH while powering on — responds at 38400 baud",
            "Default pairing password: 1234. Change with AT+PSWD=nnnn",
            "Android: use 'Serial Bluetooth Terminal' app. iPhones require BLE modules (HM-10)"
        ]
    },
    {
        id: 56,
        name: "NRF24L01+ Wireless Transceiver",
        imageUrl: "",
        category: "module",
        description: "2.4GHz ISM band transceiver for peer-to-peer wireless communication. Range: up to 100m standard, 1000m with PA+LNA version. Auto-acknowledgement and re-transmission. SPI interface. CRITICAL: 3.3V only — 5V will destroy it instantly.",
        voltage: "1.9V–3.6V (3.3V recommended)",
        pins: [
            { name: "GND",  connection: "Ground", description: "Connect to Arduino GND" },
            { name: "VCC",  connection: "Power", description: "3.3V ONLY — NOT 5V" },
            { name: "CE",   connection: "Digital", description: "Chip Enable — activates RX or TX mode" },
            { name: "CSN",  connection: "Digital", description: "Chip Select (SPI CS) — active LOW" },
            { name: "SCK",  connection: "SPI Clock", description: "SPI clock — Arduino pin 13 (Uno)" },
            { name: "MOSI", connection: "SPI Data", description: "Master Out Slave In — Arduino pin 11" },
            { name: "MISO", connection: "SPI Data", description: "Master In Slave Out — Arduino pin 12" },
            { name: "IRQ",  connection: "Digital (Output)", description: "Interrupt — goes LOW on TX/RX event" }
        ],
        tags: ["wireless", "2.4GHz", "NRF24L01", "SPI", "transceiver", "radio"],
        warnings: [
            "VCC must be 3.3V — 5V will permanently destroy the chip in milliseconds",
            "Arduino Uno 3.3V pin only supplies ~50mA — add 10–100µF cap between VCC and GND to handle current spikes during transmission"
        ],
        tips: [
            "Use RF24 library by TMRh20 (Library Manager)",
            "Add a 10–100µF electrolytic capacitor directly across VCC and GND near the module",
            "Both modules must use the same channel and pipe address",
            "PA+LNA variant with external antenna reaches 1000m line-of-sight"
        ]
    },
    {
        id: 57,
        name: "ESP8266 WiFi Module (ESP-01)",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2471-00.jpg",
        category: "module",
        description: "Low-cost WiFi SoC. In AT-command mode it acts as a WiFi co-processor for Arduino. Can be re-flashed to run standalone Arduino or NodeMCU code. 3.3V logic only — NOT 5V tolerant. Range: 50–100m indoors.",
        voltage: "3.3V (NOT 5V — instant destruction)",
        pins: [
            { name: "VCC",   connection: "Power", description: "3.3V — use dedicated AMS1117-3.3 regulator, NOT the Arduino 3.3V pin" },
            { name: "GND",   connection: "Ground", description: "Connect to Arduino GND" },
            { name: "TX",    connection: "Digital (TX)", description: "Module TX → Arduino RX via level shifter" },
            { name: "RX",    connection: "Digital (RX)", description: "Module RX → Arduino TX via voltage divider to 3.3V" },
            { name: "CH_PD", connection: "Power", description: "Chip enable — must be pulled HIGH (3.3V) to operate" },
            { name: "RST",   connection: "Digital", description: "Reset — pull LOW briefly to reset" },
            { name: "GPIO0", connection: "Digital", description: "Boot mode: float/HIGH = normal boot, LOW = flash mode" },
            { name: "GPIO2", connection: "Digital", description: "Must be HIGH at boot" }
        ],
        tags: ["WiFi", "ESP8266", "wireless", "IoT", "HTTP", "TCP"],
        warnings: [
            "NEVER connect VCC to 5V — instant destruction",
            "Module draws 200–500mA during WiFi TX — Arduino 3.3V pin cannot supply this; use dedicated AMS1117-3.3V with 100µF cap",
            "All I/O pins are 3.3V logic — use voltage dividers on any 5V signals"
        ],
        tips: [
            "Default baud: 115200. Use AT+UART_DEF=9600,8,1,0,0 to change for SoftwareSerial",
            "AT+CWJAP=\"SSID\",\"password\" connects to WiFi; AT+CIFSR shows IP address",
            "The ESP-12E/NodeMCU dev board is far easier to use than bare ESP-01 for prototyping"
        ]
    },
    {
        id: 58,
        name: "RFID RC522 Module",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/364-00.jpg",
        category: "module",
        description: "13.56MHz RFID reader/writer using the MFRC522 chipset. Reads and writes MIFARE Classic and Ultralight cards and fobs. Includes 1 card and 1 key fob. SPI interface. I2C and UART also available on some modules. Typical range: 3–5cm.",
        voltage: "2.5V–3.3V (most modules accept 5V with regulator)",
        pins: [
            { name: "VCC",   connection: "Power", description: "3.3V (or 5V if module has regulator)" },
            { name: "GND",   connection: "Ground", description: "Connect to Arduino GND" },
            { name: "RST",   connection: "Digital", description: "Reset — connect to any digital pin" },
            { name: "IRQ",   connection: "Digital (Output)", description: "Interrupt — optional, can be left unconnected" },
            { name: "MISO",  connection: "SPI Data", description: "Master In Slave Out — Arduino pin 12" },
            { name: "MOSI",  connection: "SPI Data", description: "Master Out Slave In — Arduino pin 11" },
            { name: "SCK",   connection: "SPI Clock", description: "SPI Clock — Arduino pin 13" },
            { name: "SDA/SS",connection: "Digital (SPI CS)", description: "Chip Select — commonly pin 10" }
        ],
        tags: ["RFID", "NFC", "RC522", "SPI", "access control", "card"],
        tips: [
            "Use MFRC522 library by miguelbalboa (Library Manager)",
            "Each card has a unique 4–7 byte UID: mfrc522.uid.uidByte[]",
            "MIFARE Classic 1K has 16 sectors of 4 blocks — protected by keys A and B",
            "Great for access control, attendance tracking, and inventory systems"
        ]
    },
    {
        id: 59,
        name: "OLED Display SSD1306 (128×64)",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/326-00.jpg",
        category: "output",
        description: "0.96\" monochrome OLED display, 128×64 pixels. Self-illuminating — no backlight. Extremely high contrast, wide viewing angle, low power. I2C interface (2 wires). Default I2C address: 0x3C. Compatible with 3.3V and 5V systems.",
        voltage: "3.3V–5V",
        pins: [
            { name: "VCC", connection: "Power", description: "3.3V or 5V" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL", connection: "I2C Clock", description: "Connect to A5 (Uno) or SCL pin" },
            { name: "SDA", connection: "I2C Data", description: "Connect to A4 (Uno) or SDA pin" }
        ],
        tags: ["OLED", "display", "I2C", "SSD1306", "128x64", "graphics"],
        tips: [
            "Install Adafruit_SSD1306 and Adafruit_GFX libraries via Library Manager",
            "Always call display.clearDisplay() then draw, then display.display() for flicker-free updates",
            "If 0x3C address fails, try 0x3D — set by a solder bridge on the back",
            "U8g2 library is an alternative with more fonts and lower RAM usage"
        ]
    },
    {
        id: 60,
        name: "LCD 1602 with I2C Backpack",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/399-00.jpg",
        category: "output",
        description: "Standard 16-character × 2-line character LCD with I2C backpack (PCF8574). Reduces wiring from 6+ pins to SDA/SCL only. Backlight and contrast adjustable. Default I2C address: 0x27 (some modules use 0x3F).",
        voltage: "5V",
        pins: [
            { name: "VCC", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SDA", connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "SCL", connection: "I2C Clock", description: "Connect to A5 (Uno)" }
        ],
        tags: ["LCD", "display", "I2C", "1602", "text", "16x2"],
        tips: [
            "Use LiquidCrystal_I2C library (Library Manager)",
            "If screen shows blocks/garbage but no text, adjust contrast with the blue potentiometer on the back",
            "If nothing appears, run the I2C scanner sketch to find the actual address",
            "lcd.setCursor(col, row) sets cursor; lcd.print() writes text"
        ]
    },
    {
        id: 61,
        name: "TM1637 4-Digit 7-Segment Display",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/878-00.jpg",
        category: "output",
        description: "4-digit 7-segment LED display driven by the TM1637 chip over a simple 2-wire protocol. Common anode. Displays digits 0–9 and some letters. Has a built-in colon separator ideal for clock displays. Brightness adjustable in 8 levels.",
        voltage: "3.3V–5V",
        pins: [
            { name: "VCC", connection: "Power", description: "3.3V or 5V" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DIO", connection: "Digital", description: "Data I/O — any digital pin" },
            { name: "CLK", connection: "Digital", description: "Clock — any digital pin" }
        ],
        tags: ["7-segment", "display", "TM1637", "digits", "clock", "counter"],
        tips: [
            "Use TM1637Display library by Avishay Orpaz (Library Manager)",
            "display.showNumberDec(1234) shows '1234'; add 0b01000000 mask to show colon",
            "display.showNumberDecEx(1230, 0b01000000) → '12:30' for clock display",
            "Brightness: display.setBrightness(0–7)"
        ]
    },
    {
        id: 62,
        name: "MAX7219 8×8 LED Matrix",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/988-00.jpg",
        category: "output",
        description: "8×8 LED dot matrix display driven by MAX7219 SPI LED driver. Chainable — multiple modules share the same 3 Arduino pins. Individual LED control and 16-level brightness. Used for scrolling text, animations, and games.",
        voltage: "5V",
        pins: [
            { name: "VCC", connection: "Power", description: "Connect to Arduino 5V" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DIN", connection: "SPI Data", description: "Data In — Arduino pin 11 or any digital pin" },
            { name: "CS",  connection: "Digital (SPI CS)", description: "Chip Select — any digital pin" },
            { name: "CLK", connection: "SPI Clock", description: "Clock — Arduino pin 13 or any digital pin" }
        ],
        tags: ["LED matrix", "MAX7219", "SPI", "display", "scroll", "8x8"],
        tips: [
            "Use LedControl or MD_MAX72xx library (Library Manager)",
            "Daisy-chain modules: DOUT of first → DIN of second, shared CS and CLK",
            "Add 100µF electrolytic + 100nF ceramic capacitor between VCC and GND near each module",
            "MD_Parola library supports scrolling text across multiple chained matrices"
        ]
    },
    {
        id: 63,
        name: "WS2812B NeoPixel LED Strip",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1376-00.jpg",
        category: "output",
        description: "Individually addressable RGB LEDs. Each LED contains an integrated WS2812B driver — independent full-color control over a single data wire. Approx 60mA per LED at full white. Available in 30/60/144 LEDs per metre. Cut-and-resolder at any marked point.",
        voltage: "5V (dedicated PSU for >10 LEDs)",
        pins: [
            { name: "5V / +",  connection: "Power", description: "5V supply — use dedicated PSU for long strips" },
            { name: "GND",     connection: "Ground", description: "Ground — MUST share with Arduino GND" },
            { name: "DIN / D", connection: "Digital", description: "Data in — Arduino digital pin with 300–500Ω series resistor" }
        ],
        tags: ["NeoPixel", "WS2812B", "addressable", "RGB", "LED strip", "FastLED"],
        warnings: [
            "High current — 1m of 60 LEDs at full white draws 3.6A. Never power from Arduino 5V pin",
            "Add 300–500Ω series resistor on the data line to protect the first LED from ringing",
            "Add 1000µF capacitor across 5V and GND of the strip to absorb inrush current surges"
        ],
        tips: [
            "Use FastLED or Adafruit NeoPixel library",
            "Never set all LEDs to full white at once from USB power — use setBrightness(50) for safe prototyping",
            "Connect power at both ends of long strips to prevent voltage drop and color shift",
            "FastLED: FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS)"
        ]
    },
    {
        id: 64,
        name: "BMP280 Barometric Pressure Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2651-00.jpg",
        category: "sensor",
        description: "Digital barometric pressure and temperature sensor. Pressure accuracy ±1 hPa, temperature ±1°C. I2C or SPI interface. Can calculate altitude from pressure. Range: 300–1100 hPa (±9000m altitude), -40°C to +85°C.",
        voltage: "1.8V–3.6V (most modules have 3.3V/5V regulator)",
        pins: [
            { name: "VCC", connection: "Power", description: "3.3V or 5V (check module regulator)" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL", connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "SDA", connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "SDO", connection: "I2C Address", description: "GND = address 0x76, VCC = 0x77" },
            { name: "CSB", connection: "Interface Select", description: "HIGH for I2C mode, LOW for SPI mode" }
        ],
        tags: ["pressure", "altitude", "temperature", "BMP280", "I2C", "barometric"],
        tips: [
            "Use Adafruit_BMP280 library (Library Manager)",
            "bmp.readAltitude(1013.25) — replace 1013.25 with local sea-level pressure for accuracy",
            "Place away from heat sources for accurate temperature readings",
            "SDO to GND = 0x76 (default); SDO to VCC = 0x77 for second device on same bus"
        ]
    },
    {
        id: 65,
        name: "BME280 Environmental Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2652-00.jpg",
        category: "sensor",
        description: "All-in-one temperature, humidity, and barometric pressure sensor. Adds ±3% RH humidity over the BMP280. I2C or SPI interface. Range: -40°C to +85°C, 0–100% RH, 300–1100 hPa. Default I2C address: 0x76.",
        voltage: "1.8V–3.6V (most modules have regulator for 5V use)",
        pins: [
            { name: "VCC", connection: "Power", description: "3.3V or 5V (check module)" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL", connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "SDA", connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "SDO", connection: "I2C Address", description: "GND = 0x76, VCC = 0x77" },
            { name: "CSB", connection: "Interface Select", description: "HIGH for I2C, LOW for SPI" }
        ],
        tags: ["BME280", "temperature", "humidity", "pressure", "I2C", "weather station"],
        tips: [
            "Use Adafruit_BME280 library for temperature, pressure, humidity, and altitude",
            "Drop-in replacement for BMP280 with humidity added",
            "Avoid breathing on the sensor during reads — moisture from breath skews humidity readings",
            "Use forced mode for weather stations to minimise self-heating errors"
        ]
    },
    {
        id: 66,
        name: "VL53L0X Laser Distance Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/3317-00.jpg",
        category: "sensor",
        description: "Time-of-Flight laser ranging sensor using a 940nm VCSEL laser. Range: 30–2000mm, accuracy ±3%. Works on nearly any surface color or material. I2C interface. Much more consistent than triangulation-based IR sensors.",
        voltage: "2.6V–3.5V (most modules have 5V regulator and level shifters)",
        pins: [
            { name: "VIN/VCC", connection: "Power", description: "2.6V–3.5V or 5V (if module has regulator)" },
            { name: "GND",     connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL",     connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "SDA",     connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "XSHUT",   connection: "Digital", description: "Pull LOW to power off sensor — use to reassign I2C address" },
            { name: "GPIO1",   connection: "Digital (Output)", description: "Interrupt — signals when measurement is ready" }
        ],
        tags: ["distance", "ToF", "laser", "VL53L0X", "I2C", "proximity"],
        tips: [
            "Use Adafruit_VL53L0X or pololu VL53L0X library (Library Manager)",
            "Default I2C address: 0x29. Use XSHUT to power-cycle and reassign for multiple sensors",
            "Accuracy degrades in direct sunlight or with very dark/mirror-like surfaces",
            "Long-range mode (up to 2m) trades accuracy for distance — configure via library"
        ]
    },
    {
        id: 67,
        name: "PIR Motion Sensor (HC-SR501)",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/189-00.jpg",
        category: "sensor",
        description: "Passive Infrared motion detector. Senses changes in IR radiation from warm moving bodies (people, animals). Digital output goes HIGH for adjustable hold time (3s–5min) when motion detected. Range: up to 7m. Wide supply voltage: 5V–20V.",
        voltage: "5V–20V",
        pins: [
            { name: "VCC", connection: "Power", description: "5V–20V supply" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "OUT", connection: "Digital Output", description: "HIGH when motion detected, LOW when clear" }
        ],
        tags: ["PIR", "motion", "infrared", "HC-SR501", "presence", "alarm"],
        tips: [
            "Allow 30–60 second warm-up after power-on for stable baseline",
            "Two potentiometers: sensitivity (detection range) and time delay (how long OUT stays HIGH)",
            "Jumper H = repeat-trigger mode (stays HIGH while motion continues); L = single trigger pulse",
            "Removable dome lens — cover sections with tape to narrow the detection zone",
            "Combine with relay module for automatic lights"
        ]
    },
    {
        id: 68,
        name: "MQ-2 Gas & Smoke Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/3199-00.jpg",
        category: "sensor",
        description: "Semiconductor gas sensor sensitive to LPG, propane, methane, hydrogen, smoke, and alcohol vapour. Analog and digital outputs. Heater coil consumes ~900mW and gets hot. Requires 20–48 hour pre-heat for stable baseline on new sensors.",
        voltage: "5V",
        pins: [
            { name: "VCC",  connection: "Power", description: "Connect to Arduino 5V" },
            { name: "GND",  connection: "Ground", description: "Connect to Arduino GND" },
            { name: "AOUT", connection: "Analog", description: "Analog output — voltage proportional to gas concentration" },
            { name: "DOUT", connection: "Digital", description: "Digital output — HIGH when gas exceeds threshold" }
        ],
        tags: ["gas", "smoke", "LPG", "MQ-2", "sensor", "alarm"],
        warnings: [
            "The sensor heater coil reaches ~300°C — keep away from flammable materials and plastics",
            "Readings are non-specific — use for detection, not precise PPM measurement without calibration"
        ],
        tips: [
            "Preheat for at least 20 minutes (48 hours for brand new sensor)",
            "Adjust digital output threshold with the onboard potentiometer",
            "MQ-4 for methane-specific, MQ-5 for LPG-specific, MQ-7 for carbon monoxide"
        ]
    },
    {
        id: 69,
        name: "MQ-135 Air Quality Sensor",
        imageUrl: "",
        category: "sensor",
        description: "Semiconductor sensor sensitive to NH3, NOx, alcohol, benzene, CO2, and smoke. Used as a general indoor air quality indicator. Analog and digital outputs. Same heater requirements and warm-up time as MQ-2.",
        voltage: "5V",
        pins: [
            { name: "VCC",  connection: "Power", description: "Connect to Arduino 5V" },
            { name: "GND",  connection: "Ground", description: "Connect to Arduino GND" },
            { name: "AOUT", connection: "Analog", description: "Analog output — voltage proportional to pollution level" },
            { name: "DOUT", connection: "Digital", description: "Digital output — HIGH when threshold exceeded" }
        ],
        tags: ["air quality", "CO2", "ammonia", "MQ-135", "pollution", "indoor"],
        warnings: [
            "Sensor heater gets hot — do not touch the metal mesh element during operation",
            "Not suitable for precise gas concentration measurement without calibration"
        ],
        tips: [
            "Allow 20-minute minimum warm-up; 24–48 hours for stable new-sensor baseline",
            "MQ135 library by GeorgK estimates PPM — requires RZERO calibration constant",
            "Best for relative air quality trending (improving/worsening) rather than absolute values",
            "Sensitive to humidity — readings shift in very humid environments"
        ]
    },
    {
        id: 70,
        name: "APDS-9960 Gesture & Proximity Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/3595-00.jpg",
        category: "sensor",
        description: "Integrated sensor providing gesture recognition (up/down/left/right/near/far), proximity detection (0–20cm), ambient light, and RGBA color sensing over I2C. Low power. Fixed I2C address: 0x39.",
        voltage: "2.4V–3.6V (most modules have 5V level shifters)",
        pins: [
            { name: "VCC", connection: "Power", description: "3.3V or 5V (check module)" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL", connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "SDA", connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "INT", connection: "Digital (Input)", description: "Interrupt — connect to Arduino pin 2 or 3 for event-driven gesture reading" }
        ],
        tags: ["gesture", "proximity", "APDS-9960", "I2C", "color", "touch-free"],
        tips: [
            "Use SparkFun APDS9960 or Adafruit APDS9960 library (Library Manager)",
            "Wire INT to pin 2 or 3 for interrupt-driven detection (much more responsive)",
            "Gesture mode works best in low ambient light",
            "Great for contactless UI: swipe to navigate menus or control media"
        ]
    },
    {
        id: 71,
        name: "HMC5883L Digital Compass",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1746-01.jpg",
        category: "sensor",
        description: "3-axis digital magnetometer measuring Earth's magnetic field for heading and orientation. Resolution: 2 milligauss. I2C interface (address 0x1E). Range: ±8 gauss. Note: many modules use a QMC5883L clone with a different I2C address.",
        voltage: "2.16V–3.6V (most modules include 5V regulator)",
        pins: [
            { name: "VCC",  connection: "Power", description: "3.3V or 5V (if module has regulator)" },
            { name: "GND",  connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL",  connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "SDA",  connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "DRDY", connection: "Digital (Output)", description: "Data Ready interrupt — goes LOW when measurement is complete" }
        ],
        tags: ["compass", "magnetometer", "HMC5883L", "I2C", "heading", "navigation"],
        tips: [
            "Use HMC5883L library or QMC5883L library depending on which chip your module has",
            "Heading = atan2(y, x) × (180 / PI) — add local magnetic declination for true north",
            "Keep away from motors, speakers, and ferrous metals for accurate readings",
            "Calibrate by slowly rotating through all axes to find per-axis min/max offsets"
        ]
    },
    {
        id: 72,
        name: "ACS712 Current Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2877-00.jpg",
        category: "sensor",
        description: "Hall-effect linear current sensor. Measures both AC and DC current without breaking the circuit. Available in 5A (185mV/A), 20A (100mV/A), and 30A (66mV/A) variants. Analog output centered at VCC/2 (2.5V at 5V supply).",
        voltage: "5V",
        pins: [
            { name: "VCC",  connection: "Power", description: "Connect to Arduino 5V" },
            { name: "GND",  connection: "Ground", description: "Connect to Arduino GND" },
            { name: "OUT",  connection: "Analog", description: "Analog output — 2.5V = 0A, shifts ±mV/A per variant" },
            { name: "IP+",  connection: "Current Path", description: "Positive current input — series with supply" },
            { name: "IP-",  connection: "Current Path", description: "Negative current output — series with load" }
        ],
        tags: ["current", "ACS712", "Hall effect", "analog", "AC", "DC", "measurement"],
        tips: [
            "5A variant: 185mV/A. Convert: amps = (analogRead(pin) - 512) × (5.0 / 1023.0) / 0.185",
            "Average 500+ samples to reduce noise: long sum=0; for(int i=0;i<500;i++) sum+=analogRead(pin);",
            "Offset (zero-current point) varies slightly between modules — calibrate with no current flowing",
            "For AC RMS current, sample many full cycles and calculate sqrt(mean(sample²))"
        ]
    },
    {
        id: 73,
        name: "INA219 High-Side Power Monitor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/904-00.jpg",
        category: "sensor",
        description: "I2C power monitor measuring bus voltage (0–26V), shunt voltage, current, and calculated power. 12-bit ADC. Requires a 0.1Ω shunt resistor (included on most breakout modules). 4 configurable I2C addresses (0x40–0x43) via A0/A1 pins.",
        voltage: "3.0V–5.5V",
        pins: [
            { name: "VCC",  connection: "Power", description: "3.0V–5.5V logic supply" },
            { name: "GND",  connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL",  connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "SDA",  connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "VIN+", connection: "Shunt Input", description: "Connect to power supply side of load" },
            { name: "VIN-", connection: "Shunt Output", description: "Connect to load side (current flows through internal shunt)" }
        ],
        tags: ["power monitor", "current", "voltage", "INA219", "I2C", "energy"],
        tips: [
            "Use Adafruit_INA219 library: getCurrent_mA(), getBusVoltage_V(), getPower_mW()",
            "The VIN+/VIN- path carries the load current — ensure wire gauge matches current draw",
            "Max 3.2A with onboard 0.1Ω shunt — use external lower-value shunt for higher currents",
            "Put 4 INA219s on the same I2C bus by soldering A0/A1 pads for unique addresses"
        ]
    },
    {
        id: 74,
        name: "Sharp GP2Y0A21 IR Distance Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/164-00.jpg",
        category: "sensor",
        description: "Analog infrared distance sensor using triangulation. Range: 10–80cm. Analog output voltage inversely proportional to distance. Works on most surfaces regardless of color. Fast 38ms response time. Immune to ambient light interference.",
        voltage: "4.5V–5.5V",
        pins: [
            { name: "VCC",  connection: "Power", description: "4.5V–5.5V" },
            { name: "GND",  connection: "Ground", description: "Connect to Arduino GND" },
            { name: "Vout", connection: "Analog", description: "Analog voltage output — higher voltage = closer object" }
        ],
        tags: ["distance", "IR", "Sharp", "analog", "proximity", "GP2Y0A21"],
        tips: [
            "Output is non-linear — use Sharp datasheet table or formula: cm = 29.988 × pow(voltage, -1.173)",
            "Add a 10µF electrolytic capacitor between VCC and GND close to the sensor for stable readings",
            "Objects closer than 10cm give unreliable/inverted readings — add a minimum distance check",
            "GP2Y0A02 extends range to 20–150cm; GP2Y0A710 reaches 100–550cm"
        ]
    },
    {
        id: 75,
        name: "MAX30102 Pulse Oximeter & Heart Rate",
        imageUrl: "",
        category: "sensor",
        description: "Integrated optical sensor with red (660nm) and IR (880nm) LEDs plus a photodetector. Measures heart rate (BPM) and blood oxygen saturation (SpO2). I2C interface (address 0x57). Ultra-low power. For educational/hobby use only — not a medical device.",
        voltage: "1.8V–3.3V (most modules have 5V regulator)",
        pins: [
            { name: "VIN", connection: "Power", description: "1.8V–5V (if module has regulator)" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL", connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "SDA", connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "INT", connection: "Digital (Output)", description: "Interrupt — fires when FIFO buffer is nearly full" }
        ],
        tags: ["heart rate", "SpO2", "pulse oximeter", "MAX30102", "I2C", "health"],
        warnings: [
            "For educational and hobby use only — not a medical device. Never use for clinical decisions",
            "Readings are very sensitive to motion — keep finger still throughout measurement"
        ],
        tips: [
            "Use SparkFun MAX3010x library (Library Manager)",
            "Place fingertip gently on sensor — too much pressure cuts off blood flow and ruins readings",
            "Warm up sensor for 5–10 seconds before first reading",
            "Shield sensor from ambient light with a dark enclosure for best accuracy"
        ]
    },
    {
        id: 76,
        name: "IRF520 MOSFET Driver Module",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/3190-00.jpg",
        category: "module",
        description: "N-channel MOSFET (IRF520) driver for switching high-power DC loads. Gate driven from Arduino PWM or digital output. Controls LED strips, motors, heaters, fans. Continuous load: up to 9A. PWM speed or brightness control.",
        voltage: "Gate: 3.3V–5V | Load: up to 24V DC",
        pins: [
            { name: "GND",       connection: "Ground", description: "Signal ground — connect to Arduino GND" },
            { name: "VCC",       connection: "Power", description: "Optional 5V for onboard LED indicator" },
            { name: "SIG",       connection: "Digital/PWM", description: "Gate signal from Arduino — HIGH = load ON" },
            { name: "VIN",       connection: "Load Power", description: "External power supply positive terminal" },
            { name: "GND (load)",connection: "Load Ground", description: "Load GND — connect to power supply GND and Arduino GND" },
            { name: "VOUT",      connection: "Load Output", description: "Connects to positive terminal of load" }
        ],
        tags: ["MOSFET", "IRF520", "PWM", "high power", "switch", "motor", "LED"],
        warnings: [
            "The IRF520 is only partially enhanced at 5V gate drive — for full switching efficiency above 3A, use IRLZ44N (better logic-level MOSFET)",
            "Always ensure load GND is connected to Arduino GND for the gate drive to work correctly"
        ],
        tips: [
            "analogWrite(SIG_PIN, 0–255) gives PWM dimming or motor speed control",
            "Add a flyback diode (1N4007) across motor terminals when controlling inductive loads",
            "Add a heatsink for loads above 3A continuous"
        ]
    },
    {
        id: 77,
        name: "XL6009 DC-DC Boost Converter",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1903-00.jpg",
        category: "power",
        description: "Adjustable step-up switching regulator. Converts a lower input voltage to a higher output voltage. Input: 3.3V–32V, Output: 5V–35V (must exceed input). Up to 4A output. ~94% efficiency. Used to run 12V systems from 5V or LiPo batteries.",
        voltage: "Input: 3.3V–32V | Output: 5V–35V (adjustable)",
        pins: [
            { name: "IN+",  connection: "Input", description: "Positive input voltage" },
            { name: "IN-",  connection: "Ground", description: "Input GND" },
            { name: "OUT+", connection: "Output", description: "Boosted positive output" },
            { name: "OUT-", connection: "Ground", description: "Output GND" }
        ],
        tags: ["boost", "step-up", "XL6009", "power", "adjustable", "converter"],
        warnings: [
            "Output must always be higher than input — equal voltages may cause overheating",
            "Always set and verify output voltage with a multimeter before connecting sensitive loads",
            "Do not exceed 4A — add heatsinking for sustained high-current operation"
        ],
        tips: [
            "Turn potentiometer clockwise to increase output voltage",
            "Add 100µF output capacitors to smooth voltage under load transients",
            "Ideal for boosting 3.7V LiPo to 5V, 9V, or 12V for different project requirements"
        ]
    },
    {
        id: 78,
        name: "AT24C256 I2C EEPROM",
        imageUrl: "",
        category: "storage",
        description: "32KB (256Kbit) non-volatile I2C EEPROM. Retains data without power. Byte or 64-byte page write modes. Endurance: 1,000,000 write cycles. Retention: 100 years. Address pins A0–A2 allow 8 devices on one bus (0x50–0x57). Write Protect pin (WP).",
        voltage: "2.7V–5.5V",
        pins: [
            { name: "VCC", connection: "Power", description: "2.7V–5.5V" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SDA", connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "SCL", connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "A0",  connection: "I2C Address", description: "Address bit 0 — GND or VCC" },
            { name: "A1",  connection: "I2C Address", description: "Address bit 1 — GND or VCC" },
            { name: "A2",  connection: "I2C Address", description: "Address bit 2 — GND or VCC" },
            { name: "WP",  connection: "Digital", description: "Write Protect — HIGH disables writes; connect to GND to allow writing" }
        ],
        tags: ["EEPROM", "storage", "I2C", "AT24C256", "non-volatile", "memory"],
        tips: [
            "Use extEEPROM library for convenient read/write functions",
            "Page write (64 bytes at once) is much faster than byte-by-byte writing",
            "Wait 5ms after each write command for the internal write cycle to complete",
            "Great for storing WiFi credentials, calibration data, or config that survives power cycles"
        ]
    },
    {
        id: 79,
        name: "SIM800L GSM/GPRS Module",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/2637-00.jpg",
        category: "module",
        description: "Quad-band GSM/GPRS module for SMS, voice calls, and 2G mobile data. Controlled via AT commands over UART. Requires a micro SIM card. Operating voltage: 3.4V–4.4V — NOT Arduino 5V pin and NOT 3.3V pin. Requires dedicated 2A capable supply.",
        voltage: "3.4V–4.4V (dedicated supply — 2A peak)",
        pins: [
            { name: "VCC", connection: "Power", description: "3.4V–4.4V — use 3.7V LiPo or AMS1117-3.3 with 1000µF cap" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "TXD", connection: "Digital (TX)", description: "Module TX → Arduino RX (via level shifter)" },
            { name: "RXD", connection: "Digital (RX)", description: "Module RX → Arduino TX (level shift to 3.3V)" },
            { name: "RST", connection: "Digital", description: "Hardware reset — pull LOW for 100ms to reset" }
        ],
        tags: ["GSM", "SMS", "GPRS", "SIM800L", "cellular", "2G", "IoT"],
        warnings: [
            "NEVER power from Arduino 5V or 3.3V pins — 2A+ during TX will brown-out the Arduino",
            "RXD pin is 3.3V logic — use voltage divider from Arduino TX (5V)",
            "Add 1000µF capacitor on power supply to handle transmission current spikes"
        ],
        tips: [
            "AT+CMGF=1 sets text mode; AT+CMGS=\"+1234567890\" followed by message then Ctrl+Z (ASCII 26) sends SMS",
            "AT+CREG? checks registration — wait for +CREG: 0,1 before sending messages",
            "LED blink pattern: rapid = searching, every 3s = registered on network"
        ]
    },
    {
        id: 80,
        name: "74HC595 8-Bit Shift Register",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1817-00.jpg",
        category: "module",
        description: "8-bit serial-in, parallel-out shift register. Expands 3 Arduino pins into 8 digital outputs. Chainable for more outputs (64+ from 3 pins). Each output can sink/source 35mA. Used for LED banks, multiplexed displays, and GPIO expansion.",
        voltage: "2V–6V",
        pins: [
            { name: "VCC",         connection: "Power", description: "2V–6V supply" },
            { name: "GND",         connection: "Ground", description: "Connect to Arduino GND" },
            { name: "DS/SER",      connection: "Digital", description: "Serial data input" },
            { name: "SHCP/SRCLK", connection: "Digital", description: "Shift clock — rising edge shifts one bit in" },
            { name: "STCP/RCLK",  connection: "Digital", description: "Latch clock — rising edge transfers register to outputs" },
            { name: "OE",          connection: "Digital", description: "Output Enable (active LOW) — tie to GND to always enable" },
            { name: "SRCLR/MR",   connection: "Digital", description: "Master reset (active LOW) — tie to VCC to disable reset" },
            { name: "Q0–Q7",       connection: "Digital Output", description: "8 parallel output pins" },
            { name: "Q7S",         connection: "Digital", description: "Serial output for daisy-chaining to next chip's DS pin" }
        ],
        tags: ["shift register", "74HC595", "output expansion", "LED driver", "serial"],
        tips: [
            "Arduino function: shiftOut(dataPin, clockPin, MSBFIRST, value)",
            "Daisy chain: Q7S of first chip → DS of second; share SHCP and STCP",
            "Pull STCP LOW, shiftOut(), then STCP HIGH to update all 8 outputs simultaneously",
            "Add current-limiting resistors on outputs when driving LEDs"
        ]
    },
    {
        id: 81,
        name: "PCF8574 I2C GPIO Expander",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1390-00.jpg",
        category: "module",
        description: "8-bit I2C GPIO expander. Adds 8 bidirectional I/O pins to any I2C bus with just 2 wires. Address configurable via A0–A2 (0x20–0x27) — up to 8 chips (64 extra pins) on one bus. 25mA sink current per pin. Used in LCD backpacks, relay banks, and button matrices.",
        voltage: "2.5V–6V",
        pins: [
            { name: "VCC",    connection: "Power", description: "2.5V–6V" },
            { name: "GND",    connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SDA",    connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "SCL",    connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "A0",     connection: "I2C Address", description: "Address bit 0" },
            { name: "A1",     connection: "I2C Address", description: "Address bit 1" },
            { name: "A2",     connection: "I2C Address", description: "Address bit 2" },
            { name: "P0–P7",  connection: "Digital I/O", description: "8 bidirectional I/O pins" },
            { name: "INT",    connection: "Digital (Output)", description: "Interrupt — goes LOW when any input pin changes state" }
        ],
        tags: ["I2C", "GPIO expander", "PCF8574", "I/O", "expansion"],
        tips: [
            "Write all 8 outputs: Wire.beginTransmission(0x20); Wire.write(0b10101010); Wire.endTransmission()",
            "Read all 8 inputs: Wire.requestFrom(0x20, 1); byte val = Wire.read()",
            "For inputs, write 0xFF first to set pins high (weak pull-up), then read",
            "PCF8574 library by Rob Tillaart gives convenient individual pin control"
        ]
    },
    {
        id: 82,
        name: "MCP3208 12-Bit SPI ADC",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/856-00.jpg",
        category: "module",
        description: "8-channel 12-bit Analog-to-Digital Converter with SPI interface. Provides 8 single-ended or 4 differential channels with 4096-step resolution (vs Arduino's 1024-step 10-bit ADC). Better noise performance than onboard ADC. Supply: 2.7V–5.5V.",
        voltage: "2.7V–5.5V",
        pins: [
            { name: "VDD",     connection: "Power", description: "2.7V–5.5V supply" },
            { name: "VREF",    connection: "Reference", description: "Analog reference — connect to VDD for full-range" },
            { name: "AGND",    connection: "Ground", description: "Analog ground" },
            { name: "DGND",    connection: "Ground", description: "Digital ground" },
            { name: "CLK",     connection: "SPI Clock", description: "Connect to Arduino pin 13" },
            { name: "DOUT",    connection: "SPI Data", description: "MISO — connect to Arduino pin 12" },
            { name: "DIN",     connection: "SPI Data", description: "MOSI — connect to Arduino pin 11" },
            { name: "CS/SHDN", connection: "Digital (SPI CS)", description: "Chip Select — any digital pin" },
            { name: "CH0–CH7", connection: "Analog Input", description: "8 analog input channels (0 to VREF)" }
        ],
        tags: ["ADC", "MCP3208", "SPI", "12-bit", "analog", "precision"],
        tips: [
            "12-bit gives 4096 steps vs 1024 for Arduino's built-in 10-bit ADC",
            "Request a channel by sending 3-byte SPI transaction; parse the 12-bit result from the response",
            "Connect VREF to 3.3V if reading 3.3V sensor outputs for best precision",
            "Much lower noise floor than analogRead() — ideal for precision sensors and audio"
        ]
    },
    {
        id: 83,
        name: "Logic Level Converter (BSS138)",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/757-00.jpg",
        category: "module",
        description: "Bidirectional 4-channel logic level converter using BSS138 N-channel MOSFETs. Safely interfaces 3.3V and 5V devices. No direction configuration needed — works bidirectionally. Essential for connecting NRF24L01, RFID, OLED, and other 3.3V modules to a 5V Arduino.",
        voltage: "LV: 1.8V–3.3V | HV: 3.3V–10V",
        pins: [
            { name: "LV",      connection: "Power", description: "Low voltage reference (3.3V)" },
            { name: "HV",      connection: "Power", description: "High voltage reference (5V)" },
            { name: "GND",     connection: "Ground", description: "Common ground — shared between both sides" },
            { name: "LV1–LV4",connection: "Digital I/O", description: "Low-voltage side signals (3.3V)" },
            { name: "HV1–HV4",connection: "Digital I/O", description: "High-voltage side signals (5V)" }
        ],
        tags: ["level shifter", "3.3V", "5V", "BSS138", "interface", "bidirectional"],
        tips: [
            "Connect LV to Arduino 3.3V pin and HV to Arduino 5V pin",
            "One module handles 4 bidirectional signal lines simultaneously",
            "Works for I2C, SPI, UART, and general GPIO",
            "Required for any 3.3V IC connected to 5V Arduino to prevent chip damage",
            "Not suitable for SPI above ~4 MHz — use dedicated high-speed level shifters for fast SPI"
        ]
    },
    {
        id: 84,
        name: "TTP223 Capacitive Touch Sensor",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/1374-00.jpg",
        category: "input",
        description: "Single-channel self-calibrating capacitive touch sensor. Detects finger proximity without physical pressure. Toggle or momentary output mode (solder pad configurable). Active HIGH output by default. Supply: 2V–5.5V. Self-calibrates at startup.",
        voltage: "2V–5.5V",
        pins: [
            { name: "VCC", connection: "Power", description: "2V–5.5V" },
            { name: "GND", connection: "Ground", description: "Connect to Arduino GND" },
            { name: "I/O", connection: "Digital Output", description: "HIGH when touched (default active HIGH)" }
        ],
        tags: ["touch", "capacitive", "TTP223", "input", "no-press"],
        tips: [
            "No debouncing needed — output is a clean digital signal",
            "AHLB solder pad: bridged = active LOW; open = active HIGH (default)",
            "TOG solder pad: bridged = toggle/latch mode; open = momentary (default)",
            "Sensor works through glass, plastic, and wood for hidden touch points",
            "Do not touch the sensor during the first 0.5s after power-up (self-calibration)"
        ]
    },
    {
        id: 85,
        name: "PCA9685 16-Channel PWM/Servo Driver",
        imageUrl: "https://cdn-shop.adafruit.com/970x728/815-00.jpg",
        category: "module",
        description: "I2C-controlled 16-channel 12-bit PWM driver. Each channel independently adjustable from 0–4096 duty cycle steps at 24–1526 Hz. Perfect for driving up to 16 servos (external 5V rail), PWM LED dimming, or motor speed control. 64 configurable I2C addresses (0x40–0x7F).",
        voltage: "2.3V–5.5V (logic), 5V–6V (servo power rail)",
        pins: [
            { name: "VCC",      connection: "Power", description: "2.3V–5.5V logic supply from Arduino" },
            { name: "GND",      connection: "Ground", description: "Connect to Arduino GND" },
            { name: "SCL",      connection: "I2C Clock", description: "Connect to A5 (Uno)" },
            { name: "SDA",      connection: "I2C Data", description: "Connect to A4 (Uno)" },
            { name: "OE",       connection: "Digital", description: "Output Enable (active LOW) — float or GND to enable; HIGH disables all outputs" },
            { name: "V+",       connection: "Servo Power", description: "External 5V–6V supply for servo motors (separate from logic VCC)" },
            { name: "CH0–CH15", connection: "PWM Output", description: "16 × 3-pin servo connectors (GND / VCC / Signal)" }
        ],
        tags: ["servo", "PWM", "PCA9685", "I2C", "16-channel", "driver", "dimmer"],
        tips: [
            "Use Adafruit PCA9685 library: pwm.setPWM(channel, 0, pulse_value)",
            "50Hz servo pulse mapping: pulse = map(angle, 0, 180, 150, 600) for most SG90/MG90 servos",
            "Always power the V+ servo rail from a dedicated 5V 3A+ supply — never from Arduino 5V",
            "Daisy-chain multiple boards on the same I2C bus by setting different addresses via A0–A5 solder pads",
            "For LEDs: pwm.setPin(channel, 0–4095) provides smooth 12-bit dimming"
        ]
    }
];
