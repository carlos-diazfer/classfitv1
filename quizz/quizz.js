
    const questions = [
    {
        question: "¿Qué macronutriente es la principal fuente de energía para el cuerpo durante el ejercicio?",
        options: [
            "Proteínas",
            "Vitaminas",
            "Carbohidratos",
            "Grasas"
        ],
        correct: 2,
        explanation: "Los carbohidratos son la fuente de energía más rápida y accesible para el cuerpo durante el ejercicio."
    },
    {
        question: "¿Cuál es el beneficio principal del entrenamiento de fuerza?",
        options: [
            "Aumentar la flexibilidad",
            "Mejorar la salud mental",
            "Desarrollar masa muscular",
            "Reducir la presión arterial"
        ],
        correct: 2,
        explanation: "El entrenamiento de fuerza tiene como principal objetivo aumentar la masa muscular y la resistencia."
    },
    {
        question: "¿Qué tipo de ejercicio mejora principalmente la resistencia cardiovascular?",
        options: [
            "Flexiones de pecho",
            "Sentadillas con peso",
            "Carrera continua",
            "Curl de bíceps"
        ],
        correct: 2,
        explanation: "Correr es un ejercicio aeróbico ideal para mejorar la resistencia cardiovascular."
    },
    {
        question: "¿Qué significa el término 'HIIT' en el contexto del entrenamiento?",
        options: [
            "Hidratos Intensos de Ingesta Total",
            "Hipertrofia Interna Intensificada Total",
            "Intervalos de Alta Intensidad",
            "Hidratación Intracelular Intensiva"
        ],
        correct: 2,
        explanation: "HIIT significa 'High-Intensity Interval Training', es decir, entrenamiento por intervalos de alta intensidad."
    },
    {
        question: "¿Cuál es una señal de sobreentrenamiento?",
        options: [
            "Más energía durante el día",
            "Dolor muscular leve por 1 día",
            "Fatiga constante y falta de progreso",
            "Dormir mejor"
        ],
        correct: 2,
        explanation: "El sobreentrenamiento se manifiesta con fatiga constante, bajo rendimiento y problemas para recuperarse."
    },
    {
        question: "¿Qué es el 'core' en el entrenamiento?",
        options: [
            "Una técnica de respiración",
            "El grupo muscular del abdomen y espalda baja",
            "Un tipo de proteína",
            "Un plan de nutrición"
        ],
        correct: 1,
        explanation: "El 'core' se refiere al conjunto de músculos que estabilizan el tronco: abdominales, lumbares y oblicuos."
    },
    {
        question: "¿Qué debe hacerse antes de cualquier sesión de ejercicio intenso?",
        options: [
            "Comer comida rápida",
            "Dormir una siesta",
            "Tomar café",
            "Calentar adecuadamente"
        ],
        correct: 3,
        explanation: "Un buen calentamiento prepara los músculos y articulaciones, evitando lesiones y mejorando el rendimiento."
    },
    {
        question: "¿Qué hormona se libera durante el ejercicio y mejora el estado de ánimo?",
        options: [
            "Insulina",
            "Adrenalina",
            "Serotonina",
            "Endorfinas"
        ],
        correct: 3,
        explanation: "Las endorfinas se liberan con el ejercicio físico, y son conocidas por generar una sensación de bienestar."
    },
    {
        question: "¿Qué significa 'repetición' en el entrenamiento con pesas?",
        options: [
            "Una serie de ejercicios diferentes",
            "Un conjunto de sesiones semanales",
            "Un movimiento completo dentro de una serie",
            "Un día de descanso"
        ],
        correct: 2,
        explanation: "Una repetición es un solo ciclo completo de un ejercicio (por ejemplo, una sentadilla o flexión)."
    },
    {
        question: "¿Cuál es el mejor momento para estirar los músculos?",
        options: [
            "Antes de dormir",
            "Justo antes del ejercicio",
            "Después del calentamiento o al final del entrenamiento",
            "Al despertar"
        ],
        correct: 2,
        explanation: "Se recomienda estirar después del calentamiento o al final del entrenamiento para evitar lesiones y mejorar la flexibilidad."
    }
];

        let currentQuestion = 0;
        let score = 0;
        let userAnswers = [];
        let quizCompleted = false;

        function initializeQuiz() {
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
            quizCompleted = false;
            document.getElementById('results').classList.add('hidden');
            document.getElementById('quizContent').classList.remove('hidden');
            document.querySelector('.controls').classList.remove('hidden');
            showQuestion();
            updateProgress();
            updateScore();
        }

        function showQuestion() {
            const question = questions[currentQuestion];
            document.getElementById('questionNumber').textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
            document.getElementById('question').textContent = question.question;
            
            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.onclick = () => selectOption(index);
                optionsContainer.appendChild(optionElement);
            });

            // Mostrar respuesta previa si existe
            if (userAnswers[currentQuestion] !== undefined) {
                selectOption(userAnswers[currentQuestion], false);
            }

            updateButtons();
        }

        function selectOption(index, updateAnswer = true) {
            const options = document.querySelectorAll('.option');
            options.forEach(option => option.classList.remove('selected'));
            options[index].classList.add('selected');
            
            if (updateAnswer) {
                userAnswers[currentQuestion] = index;
            }
            
            updateButtons();
        }

        function nextQuestion() {
            if (userAnswers[currentQuestion] === undefined) {
                alert('Por favor selecciona una respuesta antes de continuar.');
                return;
            }

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion();
                updateProgress();
            } else {
                completeQuiz();
            }
        }

        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion();
                updateProgress();
            }
        }

        function completeQuiz() {
            calculateScore();
            showResults();
        }

        function calculateScore() {
            score = 0;
            userAnswers.forEach((answer, index) => {
                if (answer === questions[index].correct) {
                    score++;
                }
            });
        }

        function showResults() {
            document.getElementById('quizContent').classList.add('hidden');
            document.querySelector('.controls').classList.add('hidden');
            document.getElementById('results').classList.remove('hidden');
            
            document.getElementById('finalScore').textContent = `${score}/10`;
            
            let feedbackText = '';
            if (score >= 9) {
                feedbackText = '¡Excelente! 🏆 Tienes un conocimiento excepcional sobre dieta saludable. ¡Sigue así!';
            } else if (score >= 7) {
                feedbackText = '¡Muy bien! 👏 Tienes buenos conocimientos sobre alimentación saludable. Solo necesitas repasar algunos conceptos.';
            } else if (score >= 5) {
                feedbackText = '¡Bien! 👍 Tienes una base sólida, pero hay espacio para mejorar tus conocimientos sobre nutrición.';
            } else {
                feedbackText = '¡No te desanimes! 💪 Hay mucho por aprender sobre alimentación saludable. ¡Sigue estudiando!';
            }
            
            document.getElementById('feedback').textContent = feedbackText;
            updateScore();
        }

        function updateProgress() {
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        function updateScore() {
            document.getElementById('currentScore').textContent = score;
        }

        function updateButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            prevBtn.disabled = currentQuestion === 0;
            
            if (currentQuestion === questions.length - 1) {
                nextBtn.textContent = 'Finalizar';
            } else {
                nextBtn.textContent = 'Siguiente';
            }
            
            nextBtn.disabled = userAnswers[currentQuestion] === undefined;
        }

        function restartQuiz() {
            initializeQuiz();
        }

        // Inicializar el cuestionario al cargar la página
        initializeQuiz();
   