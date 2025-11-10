# 🧖 Luxury Spa Management Game

A complete, interactive single-page application where you manage a luxury spa, serve clients, upgrade facilities, and grow your business!

## 🎮 How to Play

1. **Open the game**: Simply open `index.html` in any modern web browser
2. **Manage clients**: New clients will appear in the waiting area on the left
3. **Assign services**: Drag and drop clients onto available spa rooms
4. **Earn money**: Complete services to earn money and reputation
5. **Upgrade**: Use your earnings to upgrade rooms and purchase spa improvements

## ✨ Features

### Core Gameplay
- **Client Management**: Handle multiple clients with different service requests
- **Patience System**: Clients lose patience while waiting - serve them quickly!
- **VIP Clients**: Special clients who pay more for premium services
- **Mood System**: Client satisfaction affects your reputation and tips

### Spa Operations
- **4 Room Types**: Massage, Facial, Sauna, and Manicure stations
- **11 Services**: Various treatments with different durations and prices
- **Room Upgrades**: Improve quality and speed of your facilities
- **Drag & Drop**: Intuitive interface for assigning clients to rooms

### Progression
- **6 Major Upgrades**: Marketing, premium products, staff training, and more
- **Reputation System**: Build your spa's reputation to attract more clients
- **Dynamic Events**: Random positive events like magazine features and celebrity visits
- **Statistics Tracking**: Monitor revenue, satisfaction, and performance

### Interactive Features
- **Real-time Timers**: Watch services progress in real-time
- **Speed Controls**: Adjust game speed (1x, 2x, 3x)
- **Notifications**: Get instant feedback on all game events
- **Responsive Design**: Works on desktop and mobile devices

## 🎯 Game Mechanics

### Client System
- Clients arrive automatically based on your reputation
- Each client requests a specific service
- Patience decreases over time (shown by colored bar)
- Happy clients may return for more services

### Service Completion
- Assign clients to appropriate rooms by dragging
- Services take time based on duration and room speed
- Payment depends on:
  - Base service price
  - Client type (regular vs VIP)
  - Final satisfaction level
  - Quality multipliers from upgrades

### Satisfaction Factors
- Room quality level
- Service type
- Client mood when service starts
- Your spa's overall reputation

### Economic System
- Starting capital: $5,000
- Daily maintenance costs scale with spa size
- Upgrade costs increase with room levels
- Strategic investment needed for growth

## 🎲 Tips & Strategy

1. **Prioritize angry clients** - They're about to leave! Serve them first
2. **Upgrade strategically** - Balance room upgrades with spa-wide improvements
3. **Watch your cash flow** - Don't overspend on upgrades
4. **Build reputation early** - Higher reputation = more clients
5. **Use speed multiplier** - Speed up gameplay when testing strategies
6. **VIP program** - Worth the investment for consistent high-value clients

## 🛠️ Technical Details

### Technologies Used
- Pure HTML5, CSS3, and JavaScript (ES6+)
- No external dependencies or frameworks
- Runs entirely in the browser
- LocalStorage could be added for save/load functionality

### Code Architecture
- **Modular Functions**: Clean separation of concerns
- **State Management**: Centralized game state object
- **Event-Driven**: Real-time updates with efficient game loop
- **Well-Commented**: Extensive documentation throughout code

### File Structure
```
spa-game/
├── index.html      # Main game structure
├── style.css       # Complete styling and animations
├── game.js         # Game logic and functionality
└── README.md       # This file
```

## 🚀 Future Enhancements

Potential features for expansion:
- Save/load game functionality
- More room types (yoga studio, pool, etc.)
- Staff hiring and management
- Seasonal events and promotions
- Achievement system
- Multiple spa locations
- Competitor AI
- Advanced analytics dashboard

## 📝 Browser Compatibility

Works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Credits

Created as a demonstration of:
- Modern JavaScript game development
- CSS animations and transitions
- Drag and drop API
- Real-time game state management
- Responsive web design

## 📄 License

Free to use, modify, and distribute. Have fun managing your spa!

---

**Enjoy building your spa empire!** 🌟
