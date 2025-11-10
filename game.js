/**
 * SPA MANAGEMENT GAME
 * A complete single-page application game for managing a luxury spa
 * Features: Client management, room assignments, upgrades, dynamic events, and more
 */

// ==================== GAME STATE ====================
const gameState = {
    money: 5000,
    reputation: 50,
    day: 1,
    gameSpeed: 2,

    // Clients and Appointments
    clients: [],
    activeServices: [],
    appointments: [],
    nextClientId: 1,
    nextAppointmentId: 1,

    // Rooms Configuration
    rooms: [
        { id: 1, name: "Massage Room 1", type: "massage", level: 1, icon: "💆", quality: 1.0, speed: 1.0, capacity: 1, currentClient: null, services: ["Swedish Massage", "Deep Tissue", "Hot Stone"] },
        { id: 2, name: "Facial Room", type: "facial", level: 1, icon: "🧖", quality: 1.0, speed: 1.0, capacity: 1, currentClient: null, services: ["Basic Facial", "Anti-Aging", "Hydrating Facial"] },
        { id: 3, name: "Sauna", type: "sauna", level: 1, icon: "🔥", quality: 1.0, speed: 1.0, capacity: 2, currentClient: null, services: ["Sauna Session", "Steam Room"] },
        { id: 4, name: "Manicure Station", type: "manicure", level: 1, icon: "💅", quality: 1.0, speed: 1.0, capacity: 1, currentClient: null, services: ["Manicure", "Pedicure", "Gel Nails"] }
    ],

    // Services Configuration
    services: [
        { id: 1, name: "Swedish Massage", type: "massage", duration: 60, basePrice: 150, satisfactionBonus: 20 },
        { id: 2, name: "Deep Tissue", type: "massage", duration: 75, basePrice: 180, satisfactionBonus: 25 },
        { id: 3, name: "Hot Stone", type: "massage", duration: 90, basePrice: 220, satisfactionBonus: 30 },
        { id: 4, name: "Basic Facial", type: "facial", duration: 45, basePrice: 120, satisfactionBonus: 15 },
        { id: 5, name: "Anti-Aging", type: "facial", duration: 60, basePrice: 180, satisfactionBonus: 25 },
        { id: 6, name: "Hydrating Facial", type: "facial", duration: 50, basePrice: 140, satisfactionBonus: 20 },
        { id: 7, name: "Sauna Session", type: "sauna", duration: 30, basePrice: 80, satisfactionBonus: 15 },
        { id: 8, name: "Steam Room", type: "sauna", duration: 25, basePrice: 70, satisfactionBonus: 12 },
        { id: 9, name: "Manicure", type: "manicure", duration: 40, basePrice: 90, satisfactionBonus: 15 },
        { id: 10, name: "Pedicure", type: "manicure", duration: 50, basePrice: 110, satisfactionBonus: 18 },
        { id: 11, name: "Gel Nails", type: "manicure", duration: 60, basePrice: 130, satisfactionBonus: 20 }
    ],

    // Upgrades Configuration
    upgrades: [
        { id: 1, name: "Marketing Campaign", cost: 2000, purchased: false, description: "Increase client frequency", effect: "clientRate" },
        { id: 2, name: "Premium Products", cost: 3000, purchased: false, description: "Increase service prices by 20%", effect: "priceBonus" },
        { id: 3, name: "Staff Training", cost: 2500, purchased: false, description: "Services complete 25% faster", effect: "speedBonus" },
        { id: 4, name: "Luxury Ambiance", cost: 4000, purchased: false, description: "Increase satisfaction by 15%", effect: "satisfactionBonus" },
        { id: 5, name: "VIP Program", cost: 5000, purchased: false, description: "Attract high-paying VIP clients", effect: "vipClients" },
        { id: 6, name: "New Massage Room", cost: 6000, purchased: false, description: "Add another massage room", effect: "newRoom" }
    ],

    // Statistics
    stats: {
        totalClientsServed: 0,
        totalRevenue: 0,
        averageSatisfaction: 100,
        clientsLost: 0
    },

    // Modifiers from upgrades
    modifiers: {
        clientRate: 1.0,
        priceBonus: 1.0,
        speedBonus: 1.0,
        satisfactionBonus: 1.0,
        vipChance: 0.1
    }
};

// ==================== CLIENT NAMES AND MOODS ====================
const clientNames = {
    male: ["James", "Michael", "Robert", "David", "William", "Richard", "Thomas", "Daniel", "Matthew", "Anthony"],
    female: ["Emma", "Olivia", "Sophia", "Isabella", "Ava", "Mia", "Emily", "Abigail", "Madison", "Charlotte"]
};

const clientMoods = {
    happy: "😊",
    neutral: "😐",
    stressed: "😰",
    angry: "😠",
    relaxed: "😌"
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random element from an array
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Format money values
 */
function formatMoney(amount) {
    return `$${Math.floor(amount).toLocaleString()}`;
}

/**
 * Get service by name
 */
function getServiceByName(serviceName) {
    return gameState.services.find(s => s.name === serviceName);
}

/**
 * Get available room for a service type
 */
function getAvailableRoom(serviceType) {
    return gameState.rooms.find(room =>
        room.type === serviceType &&
        room.currentClient === null
    );
}

// ==================== CLIENT MANAGEMENT ====================

/**
 * Generate a new client with random preferences
 */
function generateClient() {
    const gender = Math.random() > 0.5 ? "male" : "female";
    const isVIP = Math.random() < gameState.modifiers.vipChance;
    const availableServices = gameState.services.filter(s => s.basePrice <= gameState.money * 0.5);
    const requestedService = availableServices.length > 0 ?
        randomChoice(availableServices) :
        randomChoice(gameState.services);

    const client = {
        id: gameState.nextClientId++,
        name: randomChoice(clientNames[gender]),
        gender: gender,
        isVIP: isVIP,
        requestedService: requestedService.name,
        serviceType: requestedService.type,
        payment: Math.floor(requestedService.basePrice * (isVIP ? 1.5 : 1) * gameState.modifiers.priceBonus),
        mood: "neutral",
        patience: 200,
        maxPatience: 200,
        arrivalTime: Date.now(),
        justArrived: true
    };

    gameState.clients.push(client);

    // Animate entrance
    animateEntranceDoor();

    renderClients();
    showNotification("🚶 Client Arrived", `${client.name} ${client.isVIP ? '(VIP)' : ''} is waiting for ${client.requestedService}`, "success");
}

/**
 * Update client patience over time
 */
function updateClientPatience() {
    gameState.clients.forEach(client => {
        if (client.patience > 0) {
            // Slower patience decay for more time to assign clients
            client.patience -= 0.15 * gameState.gameSpeed;

            // Clear the justArrived flag after a short time
            if (client.justArrived && Date.now() - client.arrivalTime > 500) {
                client.justArrived = false;
            }

            // Update mood based on patience (adjusted for new max of 200)
            if (client.patience > 140) client.mood = "happy";
            else if (client.patience > 80) client.mood = "neutral";
            else if (client.patience > 40) client.mood = "stressed";
            else client.mood = "angry";

            // Remove client if patience runs out
            if (client.patience <= 0) {
                removeClient(client.id);
                gameState.stats.clientsLost++;
                showNotification("Client Left", `${client.name} left due to long wait`, "error");
                gameState.reputation = Math.max(0, gameState.reputation - 5);
            }
        }
    });
    renderClients();
}

/**
 * Remove a client from waiting list
 */
function removeClient(clientId) {
    const index = gameState.clients.findIndex(c => c.id === clientId);
    if (index !== -1) {
        gameState.clients.splice(index, 1);
        renderClients();
    }
}

/**
 * Assign client to a room
 */
function assignClientToRoom(client, room) {
    if (room.currentClient) {
        showNotification("Room Occupied", "This room is currently occupied", "warning");
        return false;
    }

    // Check if room can provide the requested service
    if (!room.services.includes(client.requestedService)) {
        showNotification("Wrong Room", `${room.name} cannot provide ${client.requestedService}`, "warning");
        return false;
    }

    // Remove client from waiting list
    removeClient(client.id);

    // Get service details
    const service = getServiceByName(client.requestedService);
    const duration = service.duration / (room.speed * gameState.modifiers.speedBonus);

    // Start service
    const activeService = {
        client: client,
        room: room,
        service: service,
        startTime: Date.now(),
        duration: duration * 1000, // Convert to milliseconds
        progress: 0
    };

    room.currentClient = client;
    gameState.activeServices.push(activeService);

    showNotification("Service Started", `${client.name} started ${service.name} in ${room.name}`, "info");
    renderRooms();
    return true;
}

/**
 * Complete a service and collect payment
 */
function completeService(activeService) {
    const { client, room, service } = activeService;

    // Calculate satisfaction
    const baseSatisfaction = service.satisfactionBonus;
    const qualitySatisfaction = room.quality * 10;
    const moodPenalty = client.mood === "angry" ? -20 : client.mood === "stressed" ? -10 : 0;
    const totalSatisfaction = Math.max(0, Math.min(100, baseSatisfaction + qualitySatisfaction + moodPenalty));

    // Calculate final payment with satisfaction bonus
    const satisfactionMultiplier = 1 + (totalSatisfaction / 100) * 0.3;
    const finalPayment = Math.floor(client.payment * satisfactionMultiplier);

    // Update game state
    gameState.money += finalPayment;
    gameState.stats.totalRevenue += finalPayment;
    gameState.stats.totalClientsServed++;

    // Update reputation based on satisfaction
    if (totalSatisfaction >= 80) {
        gameState.reputation = Math.min(100, gameState.reputation + 2);
    } else if (totalSatisfaction < 50) {
        gameState.reputation = Math.max(0, gameState.reputation - 1);
    }

    // Update average satisfaction
    gameState.stats.averageSatisfaction =
        (gameState.stats.averageSatisfaction * (gameState.stats.totalClientsServed - 1) + totalSatisfaction) /
        gameState.stats.totalClientsServed;

    // Clear room
    room.currentClient = null;

    // Remove from active services
    const index = gameState.activeServices.indexOf(activeService);
    if (index !== -1) {
        gameState.activeServices.splice(index, 1);
    }

    showNotification(
        "Service Complete",
        `${client.name} paid ${formatMoney(finalPayment)} (${Math.floor(totalSatisfaction)}% satisfaction)`,
        "info"
    );

    renderRooms();
    updateStats();

    // Chance of rebooking for happy clients
    if (totalSatisfaction >= 80 && Math.random() < 0.3) {
        setTimeout(() => {
            showNotification("Return Client", `${client.name} wants to book another appointment!`, "info");
            generateClient();
        }, randomInt(10000, 30000) / gameState.gameSpeed);
    }
}

// ==================== ROOM MANAGEMENT ====================

/**
 * Upgrade a room's level
 */
function upgradeRoom(roomId) {
    const room = gameState.rooms.find(r => r.id === roomId);
    if (!room) return;

    const upgradeCost = 1000 * room.level * 2;

    if (gameState.money < upgradeCost) {
        showNotification("Insufficient Funds", `Need ${formatMoney(upgradeCost)} to upgrade`, "warning");
        return;
    }

    gameState.money -= upgradeCost;
    room.level++;
    room.quality = 1 + (room.level - 1) * 0.2;
    room.speed = 1 + (room.level - 1) * 0.15;

    showNotification("Room Upgraded", `${room.name} upgraded to level ${room.level}!`, "info");
    renderRooms();
    updateStats();
}

// ==================== UPGRADE SYSTEM ====================

/**
 * Purchase an upgrade
 */
function purchaseUpgrade(upgradeId) {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    if (!upgrade || upgrade.purchased) return;

    if (gameState.money < upgrade.cost) {
        showNotification("Insufficient Funds", `Need ${formatMoney(upgrade.cost)} for this upgrade`, "warning");
        return;
    }

    gameState.money -= upgrade.cost;
    upgrade.purchased = true;

    // Apply upgrade effects
    switch (upgrade.effect) {
        case "clientRate":
            gameState.modifiers.clientRate = 1.5;
            break;
        case "priceBonus":
            gameState.modifiers.priceBonus = 1.2;
            break;
        case "speedBonus":
            gameState.modifiers.speedBonus = 1.25;
            break;
        case "satisfactionBonus":
            gameState.modifiers.satisfactionBonus = 1.15;
            break;
        case "vipClients":
            gameState.modifiers.vipChance = 0.25;
            break;
        case "newRoom":
            addNewRoom();
            break;
    }

    showNotification("Upgrade Purchased", upgrade.name, "info");
    renderUpgrades();
    updateStats();
}

/**
 * Add a new room to the spa
 */
function addNewRoom() {
    const newRoom = {
        id: gameState.rooms.length + 1,
        name: `Massage Room ${gameState.rooms.filter(r => r.type === "massage").length + 1}`,
        type: "massage",
        level: 1,
        icon: "💆",
        quality: 1.0,
        speed: 1.0,
        capacity: 1,
        currentClient: null,
        services: ["Swedish Massage", "Deep Tissue", "Hot Stone"]
    };
    gameState.rooms.push(newRoom);
    renderRooms();
}

// ==================== TIMER AND GAME LOOP ====================

/**
 * Update active services progress
 */
function updateActiveServices() {
    const currentTime = Date.now();

    gameState.activeServices.forEach(activeService => {
        const elapsed = currentTime - activeService.startTime;
        activeService.progress = Math.min(100, (elapsed / activeService.duration) * 100);

        // Complete service when progress reaches 100%
        if (activeService.progress >= 100) {
            completeService(activeService);
        }
    });

    renderRooms();
}

/**
 * Automatic client generation based on reputation
 */
function autoGenerateClients() {
    const baseChance = 0.02;
    const reputationBonus = gameState.reputation / 100;
    const finalChance = baseChance * (1 + reputationBonus) * gameState.modifiers.clientRate;

    if (Math.random() < finalChance && gameState.clients.length < 10) {
        generateClient();
    }
}

/**
 * Random events system
 */
function triggerRandomEvent() {
    if (Math.random() < 0.005) { // 0.5% chance per tick
        const events = [
            {
                title: "Magazine Feature",
                message: "Your spa was featured in a magazine! +10 reputation",
                effect: () => gameState.reputation = Math.min(100, gameState.reputation + 10)
            },
            {
                title: "Supply Discount",
                message: "You received a discount on supplies! +$500",
                effect: () => gameState.money += 500
            },
            {
                title: "Celebrity Visit",
                message: "A celebrity visited your spa! +15 reputation",
                effect: () => gameState.reputation = Math.min(100, gameState.reputation + 15)
            },
            {
                title: "Staff Bonus Day",
                message: "Your staff is extra motivated today! Services are faster",
                effect: () => {
                    gameState.rooms.forEach(room => room.speed *= 1.3);
                    setTimeout(() => {
                        gameState.rooms.forEach(room => room.speed /= 1.3);
                    }, 60000);
                }
            }
        ];

        const event = randomChoice(events);
        event.effect();
        showNotification(event.title, event.message, "info");
        updateStats();
    }
}

/**
 * Progress to next day
 */
function nextDay() {
    gameState.day++;
    showNotification("New Day", `Day ${gameState.day} has begun!`, "info");
    updateStats();

    // Daily maintenance cost
    const maintenanceCost = gameState.rooms.length * 100;
    gameState.money -= maintenanceCost;
    showNotification("Daily Costs", `Maintenance: -${formatMoney(maintenanceCost)}`, "warning");
}

/**
 * Main game loop
 */
let gameLoopInterval;
function startGameLoop() {
    gameLoopInterval = setInterval(() => {
        updateActiveServices();
        updateClientPatience();
        autoGenerateClients();
        triggerRandomEvent();

        // Check for day progression (every minute of real time)
        if (Date.now() % 60000 < 100) {
            nextDay();
        }
    }, 100); // 100ms tick rate
}

// ==================== DRAG AND DROP ====================

let draggedClient = null;

/**
 * Initialize drag and drop for clients
 */
function initializeDragAndDrop() {
    // This will be called when rendering clients
}

/**
 * Handle drag start
 */
function handleDragStart(event, client) {
    draggedClient = client;
    event.target.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
}

/**
 * Handle drag end
 */
function handleDragEnd(event) {
    event.target.classList.remove('dragging');
    draggedClient = null;

    // Remove all drop-zone highlights
    document.querySelectorAll('.room-card').forEach(card => {
        card.classList.remove('drop-zone');
    });
}

/**
 * Handle drag over room
 */
function handleDragOver(event, room) {
    if (!draggedClient) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    // Highlight valid drop zones
    const roomCard = event.currentTarget;
    if (!room.currentClient && room.services.includes(draggedClient.requestedService)) {
        roomCard.classList.add('drop-zone');
    }
}

/**
 * Handle drag leave room
 */
function handleDragLeave(event) {
    event.currentTarget.classList.remove('drop-zone');
}

/**
 * Handle drop on room
 */
function handleDrop(event, room) {
    event.preventDefault();
    event.currentTarget.classList.remove('drop-zone');

    if (draggedClient) {
        assignClientToRoom(draggedClient, room);
        draggedClient = null;
    }
}

// ==================== UI RENDERING ====================

/**
 * Animate entrance door when a client arrives
 */
function animateEntranceDoor() {
    const entranceArea = document.querySelector('.entrance-area');
    if (entranceArea) {
        entranceArea.classList.add('client-arriving');
        setTimeout(() => {
            entranceArea.classList.remove('client-arriving');
        }, 800);
    }
}

/**
 * Render waiting clients
 */
function renderClients() {
    const container = document.getElementById('clients-waiting');

    if (gameState.clients.length === 0) {
        container.innerHTML = '<div class="no-data">No clients waiting</div>';
        return;
    }

    container.innerHTML = gameState.clients.map(client => `
        <div class="client-card ${client.justArrived ? 'entering' : ''}"
             draggable="true"
             data-client-id="${client.id}"
             ondragstart="handleDragStart(event, ${JSON.stringify(client).replace(/"/g, '&quot;')})"
             ondragend="handleDragEnd(event)">
            <div class="client-header">
                <span class="client-name">${client.name}</span>
                ${client.isVIP ? '<span class="client-vip">VIP</span>' : ''}
                <span class="client-mood">${clientMoods[client.mood]}</span>
            </div>
            <div class="client-service">Wants: ${client.requestedService}</div>
            <div class="client-payment">Will pay: ${formatMoney(client.payment)}</div>
            <div class="client-patience">
                <div class="patience-bar" style="width: ${(client.patience / client.maxPatience) * 100}%"></div>
            </div>
            ${client.justArrived ? '<div class="entering-indicator">🚶 Just arrived!</div>' : ''}
        </div>
    `).join('');

    // Re-attach drag handlers with proper client objects
    gameState.clients.forEach(client => {
        const element = container.querySelector(`[data-client-id="${client.id}"]`);
        if (element) {
            element.ondragstart = (e) => handleDragStart(e, client);
            element.ondragend = handleDragEnd;
        }
    });
}

/**
 * Render spa rooms
 */
function renderRooms() {
    const container = document.getElementById('rooms-grid');

    container.innerHTML = gameState.rooms.map(room => {
        const activeService = gameState.activeServices.find(s => s.room.id === room.id);
        const isOccupied = room.currentClient !== null;
        const upgradeCost = 1000 * room.level * 2;

        return `
            <div class="room-card ${isOccupied ? 'occupied' : ''}"
                 data-room-id="${room.id}"
                 ondragover="handleDragOver(event, ${JSON.stringify(room).replace(/"/g, '&quot;')})"
                 ondragleave="handleDragLeave(event)"
                 ondrop="handleDrop(event, ${JSON.stringify(room).replace(/"/g, '&quot;')})">
                <div class="room-header">
                    <span class="room-icon">${room.icon}</span>
                    <span class="room-level">Lv ${room.level}</span>
                </div>
                <div class="room-name">${room.name}</div>
                <div class="room-type">${room.type.charAt(0).toUpperCase() + room.type.slice(1)}</div>
                <div class="room-stats">
                    <div class="room-stat">
                        <span class="room-stat-label">Quality:</span>
                        <span class="room-stat-value">${(room.quality * 100).toFixed(0)}%</span>
                    </div>
                    <div class="room-stat">
                        <span class="room-stat-label">Speed:</span>
                        <span class="room-stat-value">${(room.speed * 100).toFixed(0)}%</span>
                    </div>
                </div>

                ${activeService ? `
                    <div class="room-client">
                        <div class="room-client-name">${activeService.client.name}</div>
                        <div class="room-client-progress">${activeService.service.name}</div>
                        <div class="room-progress-bar">
                            <div class="progress-fill" style="width: ${activeService.progress}%"></div>
                        </div>
                    </div>
                ` : '<div style="margin-top: auto; color: #999; text-align: center; padding: 20px;">Drop client here</div>'}

                <div class="room-actions">
                    <button class="btn-action upgrade" onclick="upgradeRoom(${room.id})">
                        Upgrade (${formatMoney(upgradeCost)})
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Re-attach drag handlers with proper room objects
    gameState.rooms.forEach(room => {
        const element = container.querySelector(`[data-room-id="${room.id}"]`);
        if (element) {
            element.ondragover = (e) => handleDragOver(e, room);
            element.ondragleave = handleDragLeave;
            element.ondrop = (e) => handleDrop(e, room);
        }
    });
}

/**
 * Render available services
 */
function renderServices() {
    const container = document.getElementById('services-list');

    // Group services by type
    const servicesByType = {};
    gameState.services.forEach(service => {
        if (!servicesByType[service.type]) {
            servicesByType[service.type] = [];
        }
        servicesByType[service.type].push(service);
    });

    let html = '';
    for (const [type, services] of Object.entries(servicesByType)) {
        html += `<div style="margin-bottom: 15px;">
            <div style="color: white; font-weight: bold; margin-bottom: 8px; text-transform: capitalize;">
                ${type}
            </div>`;

        services.forEach(service => {
            const price = Math.floor(service.basePrice * gameState.modifiers.priceBonus);
            html += `
                <div class="service-item">
                    <div class="service-header">
                        <span class="service-name">${service.name}</span>
                        <span class="service-price">${formatMoney(price)}</span>
                    </div>
                    <div class="service-details">
                        <span>${service.duration} min</span>
                        <span>+${service.satisfactionBonus} satisfaction</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';
    }

    container.innerHTML = html;
}

/**
 * Render available upgrades
 */
function renderUpgrades() {
    const container = document.getElementById('upgrades-list');

    const availableUpgrades = gameState.upgrades.filter(u => !u.purchased);

    if (availableUpgrades.length === 0) {
        container.innerHTML = '<div class="no-data">All upgrades purchased!</div>';
        return;
    }

    container.innerHTML = availableUpgrades.map(upgrade => {
        const canAfford = gameState.money >= upgrade.cost;
        return `
            <div class="upgrade-item ${canAfford ? '' : 'locked'}"
                 onclick="${canAfford ? `purchaseUpgrade(${upgrade.id})` : ''}">
                <div class="upgrade-header">
                    <span class="upgrade-name">${upgrade.name}</span>
                    <span class="upgrade-cost">${formatMoney(upgrade.cost)}</span>
                </div>
                <div class="upgrade-description">${upgrade.description}</div>
            </div>
        `;
    }).join('');
}

/**
 * Update header statistics
 */
function updateStats() {
    document.getElementById('money').textContent = formatMoney(gameState.money);
    document.getElementById('reputation').textContent = Math.floor(gameState.reputation);
    document.getElementById('satisfaction').textContent = Math.floor(gameState.stats.averageSatisfaction) + '%';
    document.getElementById('day').textContent = gameState.day;
}

/**
 * Show notification
 */
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('events-container');

    const icons = {
        info: '💡',
        warning: '⚠️',
        error: '❌',
        success: '✅'
    };

    const notification = document.createElement('div');
    notification.className = `event-notification ${type}`;
    notification.innerHTML = `
        <span class="event-icon">${icons[type]}</span>
        <div class="event-content">
            <div class="event-title">${title}</div>
            <div class="event-message">${message}</div>
        </div>
    `;

    container.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==================== MODAL SYSTEM ====================

/**
 * Show modal with room details
 */
function showRoomDetails(roomId) {
    const room = gameState.rooms.find(r => r.id === roomId);
    if (!room) return;

    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    title.textContent = room.name;
    body.innerHTML = `
        <div style="line-height: 1.8;">
            <p><strong>Type:</strong> ${room.type}</p>
            <p><strong>Level:</strong> ${room.level}</p>
            <p><strong>Quality:</strong> ${(room.quality * 100).toFixed(0)}%</p>
            <p><strong>Speed:</strong> ${(room.speed * 100).toFixed(0)}%</p>
            <p><strong>Services:</strong></p>
            <ul>
                ${room.services.map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>
    `;

    modal.classList.remove('hidden');
}

/**
 * Close modal
 */
function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

// ==================== EVENT LISTENERS ====================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Generate client button
    document.getElementById('generate-client').addEventListener('click', generateClient);

    // Speed controls
    document.getElementById('speed-1x').addEventListener('click', () => setGameSpeed(1));
    document.getElementById('speed-2x').addEventListener('click', () => setGameSpeed(2));
    document.getElementById('speed-3x').addEventListener('click', () => setGameSpeed(3));

    // Modal close
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'modal-overlay') {
            closeModal();
        }
    });
}

/**
 * Set game speed
 */
function setGameSpeed(speed) {
    gameState.gameSpeed = speed;

    // Update button states
    document.querySelectorAll('.speed-controls .btn-small').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`speed-${speed}x`).classList.add('active');

    showNotification("Speed Changed", `Game speed set to ${speed}x`, "info");
}

// ==================== GAME INITIALIZATION ====================

/**
 * Initialize the game
 */
function initGame() {
    console.log("🎮 Initializing Spa Management Game...");

    // Render initial UI
    renderClients();
    renderRooms();
    renderServices();
    renderUpgrades();
    updateStats();

    // Initialize event listeners
    initializeEventListeners();

    // Start game loop
    startGameLoop();

    // Generate initial clients
    setTimeout(() => generateClient(), 2000);
    setTimeout(() => generateClient(), 5000);
    setTimeout(() => generateClient(), 8000);

    // Welcome notification
    showNotification(
        "Welcome to Luxury Spa Manager!",
        "Drag clients to rooms to start services. Earn money and upgrade your spa!",
        "info"
    );

    console.log("✅ Game initialized successfully!");
}

// Start the game when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

// Expose functions to global scope for inline event handlers
window.upgradeRoom = upgradeRoom;
window.purchaseUpgrade = purchaseUpgrade;
window.handleDragStart = handleDragStart;
window.handleDragEnd = handleDragEnd;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;
