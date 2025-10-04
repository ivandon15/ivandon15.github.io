// --- 游戏配置区：在这里定制你的老虎机！ ---
const icons = [
    { 
        type: 'image', 
        content: 'images/note-small.jpg', 
        fullImage: 'images/note.jpg',
        alt: '!!稀有简短手写信!!' 
    },
    { 
        type: 'image', 
        content: 'images/dalian-small.jpg', 
        fullImage: 'images/dalian.jpg',
        alt: '大连莲花山' 
    },
    { 
        type: 'image', 
        content: 'images/miaofengshan-small.jpg', 
        fullImage: 'images/miaofengshan.jpg',
        alt: '妙峰山观星之夜' 
    },
    { 
        type: 'image', 
        content: 'images/qibao-small.jpg', 
        fullImage: 'images/qibao.jpg',
        alt: '七宝老街炸里脊店' 
    },
    { 
        type: 'image', 
        content: 'images/qipaohu-small.jpg', 
        fullImage: 'images/qipaohu.jpg',
        alt: '蒙山气泡湖' 
    },
    { 
        type: 'image', 
        content: 'images/tanzhesi-small.jpg', 
        fullImage: 'images/tanzhesi.jpg',
        alt: '潭柘寺老虎洞' 
    },
    { 
        type: 'image', 
        content: 'images/xiaozhanglang-small.jpg', 
        fullImage: 'images/xiaozhanglang.jpg',
        alt: 'cici酒吧哦' 
    },
    { 
        type: 'image', 
        content: 'images/yidoudongwuyuan-small.jpg', 
        fullImage: 'images/yidoudongwuyuan.jpg',
        alt: '伊豆动物园' 
    }
];

const rechargeOptions = [
    {
        task: "亲一下邓伊凡",
        reward: 5,
    },
    {
        task: "抱一下邓伊凡",
        reward: 5,
    },
    {
        task: "想三个词语夸奖邓伊凡",
        reward: 6,
    },
    {
        task: "做狒狒的动作并喊我是大傻逼",
        reward: 9,
    },
    {
        task: "给邓伊凡按摩5分钟",
        reward: 8,
    },
    {
        task: "剪刀石头布3局2胜",
        reward: 5,
    }
];

// 中奖组合和对应的奖品
const prizes = {
    '0,0,0': {
        text: '奖励你一个超大的生日蛋糕！不，是奖励你，你就是我最甜的蛋糕！',
        iconIndex: 0
    },
    '1,1,1': {
        text: '解锁一份神秘的生日礼物！快回头看看我准备了什么！',
        iconIndex: 1
    },
    '2,2,2': {
        text: '赢得男友的"爱心抱抱"一次，有效期：永久！',
        iconIndex: 2
    },
    '3,3,3': {
        text: '恭喜女王大人加冕！今天你的一切要求，我都会满足！',
        iconIndex: 3
    },
    '4,4,4': {
        text: '为你清空购物车里的那支口红！',
        iconIndex: 4
    },
    '5,5,5': {
        text: '今晚我们去吃一顿浪漫的烛光晚餐庆祝一下吧！',
        iconIndex: 5
    },
    '6,6,6': {
        text: '获得"旅行基金"！我们计划一次只属于我们的旅行！',
        iconIndex: 6
    },
    '7,7,7': {
        text: '获得"旅行基金"！我们计划一次只属于我们的旅行！',
        iconIndex: 6
    }
};

// 中奖概率配置 - 使用索引
const winProbability = {
    '0,0,0': 2,  
    '1,1,1': 4,   
    '2,2,2': 4,   
    '3,3,3': 4,   
    '4,4,4': 4,  
    '5,5,5': 4,   
    '6,6,6': 4,   
    '7,7,7': 4    
};

const initialCoins = 5; // 初始硬币数量
const rechargeAmount = 5; // 每次"充值"获得的硬币数量
const reelItemsCount = 30; // 卷轴上图标总数，越多越真实

// --- 功能代码区，一般无需修改 ---
const reels = [
    document.querySelector('#reel1 .reel-inner'),
    document.querySelector('#reel2 .reel-inner'),
    document.querySelector('#reel3 .reel-inner')
];
const spinButton = document.getElementById('spinButton');
const coinBalanceDisplay = document.getElementById('coinBalance');

const prizeModal = document.getElementById('prizeModal');
const prizeTitle = document.getElementById('prizeTitle');
const prizeContent = document.getElementById('prizeContent');
const closePrizeModal = document.getElementById('closePrizeModal');

const imageViewModal = document.getElementById('imageViewModal');
const imageTitle = document.getElementById('imageTitle');
const fullImage = document.getElementById('fullImage');
const closeImageModal = document.getElementById('closeImageModal');

const buyCoinsModal = document.getElementById('buyCoinsModal');
// const rechargeButton = document.getElementById('rechargeButton');

let coins = initialCoins;
let isSpinning = false;

// 创建图标元素的辅助函数
function createIconElement(iconData) {
    const icon = document.createElement('div');
    icon.className = 'icon';
    
    if (iconData.type === 'emoji') {
        icon.textContent = iconData.content;
    } else if (iconData.type === 'image') {
        const img = document.createElement('img');
        img.src = iconData.content;
        img.alt = iconData.alt || '';
        img.style.width = '104px'; /* 从80px增加到104px */
        img.style.height = '104px'; /* 从80px增加到104px */
        img.style.objectFit = 'cover';
        img.style.borderRadius = '6px'; /* 从5px增加到6px */
        icon.appendChild(img);
    }
    
    return icon;
}

function updateCoinDisplay() {
    coinBalanceDisplay.textContent = `🎂 生日硬币: ${coins}`;
}

function setupReels() {
    reels.forEach(reel => {
        reel.innerHTML = '';
        // 洗牌算法，让图标顺序更随机
        const shuffledIconIndexes = Array.from({length: icons.length}, (_, i) => i)
            .sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < reelItemsCount; i++) {
            const iconIndex = shuffledIconIndexes[i % shuffledIconIndexes.length];
            const icon = createIconElement(icons[iconIndex]);
            reel.appendChild(icon);
        }
    });
}

function setupReelsForResult(targetResults) {
    reels.forEach((reel, reelIndex) => {
        reel.innerHTML = '';
        const targetIconIndex = targetResults[reelIndex];
        
        // 计算转3圈后停在可视区域需要的目标位置
        const extraSpins = 3;
        const totalItems = reelItemsCount;
        const spinsDistance = extraSpins * icons.length;
        const targetPosition = spinsDistance % totalItems;
        
        console.log(`卷轴${reelIndex + 1}: 目标图标索引=${targetIconIndex}, 目标位置=${targetPosition}`);
        
        // 创建卷轴内容
        for (let i = 0; i < reelItemsCount; i++) {
            let icon;
            
            if (i === targetPosition) {
                // 在目标位置放置目标图标
                icon = createIconElement(icons[targetIconIndex]);
                console.log(`卷轴${reelIndex + 1}: 在位置${i}放置了目标图标`);
            } else {
                // 其他位置随机放置图标
                const randomIconIndex = Math.floor(Math.random() * icons.length);
                icon = createIconElement(icons[randomIconIndex]);
            }
            reel.appendChild(icon);
        }
    });
}

function spin() {
    if (isSpinning) return;
    
     if (coins <= 0) {
        showBuyCoinsModal(); // 使用新的函数
        return;
    }

    isSpinning = true;
    coins--;
    updateCoinDisplay();
    spinButton.disabled = true;
    spinButton.textContent = '转动中…';
    
    let results = [];
    
    // 先决定是否中奖以及中什么奖
    const shouldWin = Math.random() * 100;
    let cumulativeProbability = 0;
    let targetWin = null;
    
    // 按概率选择中奖组合
    for (const [combination, probability] of Object.entries(winProbability)) {
        cumulativeProbability += probability;
        if (shouldWin <= cumulativeProbability) {
            targetWin = combination;
            break;
        }
    }
    
    if (targetWin) {
        // 如果中奖，设置对应的结果
        results = targetWin.split(',').map(Number); // 转换为数字数组
        console.log('预设中奖:', targetWin, '图标索引:', results);
        setupReelsForResult(results);
    } else {
        // 如果不中奖，随机生成不匹配的组合
        do {
            results = [];
            for (let i = 0; i < 3; i++) {
                results.push(Math.floor(Math.random() * icons.length));
            }
        } while (prizes[results.join(',')]); // 确保不会意外中奖
        console.log('预设不中奖:', results);
        setupReelsForResult(results);
    }

    reels.forEach((reel, index) => {
        // 重置卷轴到初始位置
        reel.style.transition = 'none';
        reel.style.transform = `translateY(0)`;
        reel.offsetHeight; // 触发重绘
        
        // 计算动画距离：转3圈的距离
        const extraSpins = 3;
        const animationDistance = extraSpins * icons.length * 130; // 转3圈的像素距离
        
        console.log(`卷轴${index + 1}: 动画距离=${animationDistance}px`);
        
        reel.style.transition = `transform ${3 + index * 0.5}s cubic-bezier(0.25, 1, 0.5, 1)`;
        reel.style.transform = `translateY(-${animationDistance}px)`;
    });
    
    setTimeout(() => {
        checkWin(results);
    }, 4500); // 等待所有动画结束
}

function checkWin(results) {
    const winKey = results.join(',');
    console.log('结果索引:', results, '组合:', winKey);
    
    if (prizes[winKey]) {
        const prize = prizes[winKey];
        const iconData = icons[prize.iconIndex];
        
        prizeTitle.textContent = '🎉 中奖啦 🎉';
        prizeContent.innerHTML = `
            <div class="prize-icon-container">
                <img src="${iconData.content}" alt="${iconData.alt}" class="prize-small-icon" />
            </div>
            <p style="margin-top: 20px;">猜猜我在哪里？</p>
            <div class="prize-buttons">
                <button class="modal-button" id="closePrizeOnly">继续游戏</button>
                <button class="secondary-button" id="viewPrizeImage">查看答案</button>
            </div>
        `;
        prizeModal.classList.add('visible');
        
        // 添加查看奖品按钮的事件监听
        document.getElementById('viewPrizeImage').addEventListener('click', () => {
            showPrizeImage(prize.iconIndex);
        });
        
        document.getElementById('closePrizeOnly').addEventListener('click', () => {
            closePrizeModalHandler();
        });
        
    } else {
        // 未中奖
        isSpinning = false;
        if(coins > 0) {
            spinButton.disabled = false;
            spinButton.textContent = '拉杆';
        } else {
            spinButton.textContent = '购买硬币';
            showBuyCoinsModal(); // 使用新的函数
        }
    }
}

function showPrizeImage(iconIndex) {
    const iconData = icons[iconIndex];
    imageTitle.textContent = `🎁 ${iconData.alt} 🎁`;
    fullImage.src = iconData.fullImage;
    fullImage.alt = iconData.alt;
    
    // 关闭奖品弹窗，打开图片查看弹窗
    prizeModal.classList.remove('visible');
    imageViewModal.classList.add('visible');
}

function closePrizeModalHandler() {
    prizeModal.classList.remove('visible');
    isSpinning = false;
    if(coins > 0) {
        spinButton.disabled = false;
        spinButton.textContent = '拉杆';
    } else {
        spinButton.textContent = '购买硬币';
        buyCoinsModal.classList.add('visible');
    }
}

// 生成随机充值选项
function generateRechargeOptions() {
    // 随机选择3个不同的充值选项
    const shuffled = [...rechargeOptions].sort(() => Math.random() - 0.5);
    const selectedOptions = shuffled.slice(0, Math.min(3, rechargeOptions.length));
    
    const optionsContainer = document.getElementById('rechargeOptions');
    if (!optionsContainer) {
        console.error('找不到充值选项容器');
        return;
    }
    
    optionsContainer.innerHTML = '';
    
    selectedOptions.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'recharge-option';
        optionElement.innerHTML = `
            <div class="recharge-task">${option.task}</div>
            <div class="recharge-reward">奖励：${option.reward} 枚硬币</div>
        `;
        
        optionElement.addEventListener('click', () => {
            completeRecharge(option.reward);
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    console.log('已生成充值选项:', selectedOptions.length, '个');
}


// 完成充值
function completeRecharge(rewardAmount) {
    coins += rewardAmount;
    updateCoinDisplay();
    buyCoinsModal.classList.remove('visible');
    spinButton.disabled = false;
    spinButton.textContent = '拉杆';
    
    // 显示充值成功提示
    showRechargeSuccess(rewardAmount);
}

// 显示充值成功提示
function showRechargeSuccess(amount) {
    prizeTitle.textContent = '💰 充值成功！ 💰';
    prizeContent.innerHTML = `
        <p>恭喜你获得了 <strong>${amount}</strong> 枚生日硬币！</p>
        <p>继续游戏，赢取更多奖品吧！</p>
        <button class="modal-button" id="closePrizeOnly">继续游戏</button>
    `;
    prizeModal.classList.add('visible');
    document.getElementById('closePrizeOnly').addEventListener('click', () => {
        closePrizeModalHandler();
    });
}

// 在显示充值弹窗时生成选项
function showBuyCoinsModal() {
    console.log('显示充值弹窗');
    generateRechargeOptions();
    buyCoinsModal.classList.add('visible');
}

// 事件监听器
spinButton.addEventListener('click', spin);
// closePrizeModal.addEventListener('click', closePrizeModalHandler);

closeImageModal.addEventListener('click', () => {
    imageViewModal.classList.remove('visible');
    isSpinning = false;
    if(coins > 0) {
        spinButton.disabled = false;
        spinButton.textContent = '拉杆';
    } else {
        spinButton.textContent = '购买硬币';
        showBuyCoinsModal(); // 使用新的函数
    }
});


// 初始化
updateCoinDisplay();
setupReels();

// 可选：测试充值选项生成功能
console.log('充值选项配置:', rechargeOptions);