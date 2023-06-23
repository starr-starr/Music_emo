import { useState, useEffect } from 'react';

function useThemeColor() {
    const [appearance, setAppearance] = useState(() =>
        localStorage.getItem('appearance') || 'auto'
    );

    // 查询当前系统主题颜色
    const match = window.matchMedia('(prefers-color-scheme: dark)');

    const followSystem = () => {
        const theme = match.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    };

    useEffect(() => {
        // 监听系统主题变化
        match.addEventListener('change', followSystem);

        return () => {
            match.removeEventListener('change', followSystem);
        };
    }, []);

    useEffect(() => {
        // 如果主题变量为 auto, 则跟随系统主题
        if (appearance === 'auto') {
            followSystem();
        } else {
            document.documentElement.setAttribute('data-theme', appearance);
        }
        // 保存主题变量到本地存储
        localStorage.setItem('appearance', appearance);
    }, [appearance]);

    return {
        appearance,
        setAppearance,
    };
}

export default useThemeColor;
