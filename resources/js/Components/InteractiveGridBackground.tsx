import React, { useState } from 'react';

interface InteractiveGridProps {
    children: React.ReactNode;
    cellSizeF?: number;
    glowColor?: string;
}

export default function InteractiveGridBackground({
    children,
    cellSizeF = 40,
    glowColor = 'rgba(168, 85, 247, 0.4)' // Morado neón por defecto
}: InteractiveGridProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div 
            className="min-h-screen bg-black text-purple-50 flex flex-col font-sans relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* CAPA DE CUADRÍCULA INTERACTIVA */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Cuadrícula de líneas de fondo */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(168, 85, 247, 0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: `${cellSizeF}px ${cellSizeF}px`
                    }}
                />

                {/* Luz interactiva que sigue el cursor */}
                {isHovered && (
                    <div 
                        className="absolute pointer-events-none transition-opacity duration-300 rounded-full blur-[80px]"
                        style={{
                            width: '400px',
                            height: '400px',
                            left: `${mousePosition.x - 200}px`,
                            top: `${mousePosition.y - 200}px`,
                            background: glowColor,
                        }}
                    />
                )}

                {/* Resplandor de apoyo estático para dar profundidad cyberpunk */}
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[40%] bg-purple-500/15 rounded-full blur-[100px]" />
            </div>

            {/* CONTENIDO DE LA PÁGINA */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {children}
            </div>
        </div>
    );
}