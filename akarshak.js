const startScreen = document.getElementById("startScreen");
        const startButton = document.getElementById("startButton");
        const intro = document.getElementById("intro");
        const audio = document.getElementById("introAudio");
        const mainContent = document.getElementById("mainContent");
        const messageSection = document.getElementById("messageSection");
        const messageAudio = document.getElementById("messageAudio");
        const finalSection = document.getElementById("finalSection");
        const finalYesBtn = document.getElementById("finalYesBtn");
        const finalNoBtn = document.getElementById("finalNoBtn");
        const finalReveal = document.getElementById("finalReveal");
        const finalAudio = document.getElementById("finalAudio");

        let noButtonVisible = true;

        startButton.addEventListener("click", () => {
            // Hide start screen with smooth transition
            startScreen.classList.add("hidden");

            // Show and start intro after start screen fades
            setTimeout(() => {
                intro.classList.add("active");

                // Play audio
                audio.play().catch((err) => {
                    console.log("Audio play failed:", err);
                });
            }, 400);

            // Stop audio and show main content after 12 seconds
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                mainContent.classList.add("show");
                
                // Start confetti explosion
                createConfetti();
            }, 12400);

            // After 12 more seconds (total 24.4s), transition to message section
            setTimeout(() => {
                // Fade out cake section
                mainContent.classList.add('fade-out');
                
                // Show message section
                setTimeout(() => {
                    messageSection.classList.add('show');
                    createParticles();
                    
                    // Play romantic audio
                    messageAudio.play().catch(err => {
                        console.log("Message audio play failed:", err);
                    });

                    // Stop audio after 20 seconds
                    setTimeout(() => {
                        messageAudio.pause();
                        messageAudio.currentTime = 0;
                    }, 20000);
                }, 2000);
            }, 24400);

            // After message section (15s more = total 39.4s), show final question
            setTimeout(() => {
                messageSection.style.display = 'none';
                finalSection.classList.add('show');
            }, 39400);
        });

        // NO button runs away
        finalNoBtn.addEventListener('mouseenter', () => {
            if (noButtonVisible) {
                const maxX = window.innerWidth - finalNoBtn.offsetWidth - 40;
                const maxY = window.innerHeight - finalNoBtn.offsetHeight - 40;
                
                const randomX = Math.max(20, Math.random() * maxX);
                const randomY = Math.max(100, Math.random() * maxY);
                
                finalNoBtn.style.position = 'fixed';
                finalNoBtn.style.left = randomX + 'px';
                finalNoBtn.style.top = randomY + 'px';
            }
        });

        // YES button triggers final reveal
        finalYesBtn.addEventListener('click', () => {
            noButtonVisible = false;
            finalNoBtn.style.display = 'none';
            
            // Hide final section immediately
            finalSection.style.display = 'none';
            
            // Show final reveal
            finalReveal.classList.add('show');
            finalReveal.classList.add('fade-out');
            
            // Play final audio
            finalAudio.play().catch(err => {
                console.log("Final audio play failed:", err);
            });

            // Stop audio after 10 seconds
            setTimeout(() => {
                finalAudio.pause();
                finalAudio.currentTime = 0;
            }, 10000);
        });

        // Confetti explosion
        function createConfetti() {
            const container = document.getElementById('confettiContainer');
            const colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff00ff', '#ffffff'];
            
            for (let i = 0; i < 150; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                container.appendChild(confetti);
            }

            // Remove confetti after 12 seconds
            setTimeout(() => {
                container.innerHTML = '';
            }, 12000);
        }

        // Romantic floating particles
        function createParticles() {
            const container = document.getElementById('particlesContainer');
            
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
                container.appendChild(particle);
            }
        }
