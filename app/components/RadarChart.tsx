'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

// Add CSS for dynamic hover colors
const dynamicHoverStyles = `
  .skill-card:hover {
    border-color: var(--hover-color) !important;
  }
  .skill-card:hover .skill-title {
    color: var(--hover-color) !important;
  }
`

interface RadarData {
    skill: string
    value: number
    fullMark: number
}

interface RadarChartProps {
    data: RadarData[]
    color: string
    title: string
    icon: React.ElementType
    delay?: number
    strokeColor: string
    fillColor: string
}

const CustomRadarChart: React.FC<RadarChartProps> = ({
    data,
    color,
    title,
    icon: Icon,
    delay = 0,
    strokeColor,
    fillColor
}) => {
    const [animatedData, setAnimatedData] = useState<RadarData[]>(
        data.map(item => ({ ...item, value: 0 }))
    )
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setAnimatedData(data)
            }, delay)
            return () => clearTimeout(timer)
        }
    }, [isVisible, data, delay])

    return (
        <>
            <style>{dynamicHoverStyles}</style>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                onViewportEnter={() => setIsVisible(true)}
                transition={{ duration: 0.6, delay: delay * 0.1 }}
                viewport={{ once: true }}
                className="skill-card glass p-6 rounded-xl border border-white/10 transition-all duration-300 group focus:outline-none"
                style={{
                    outline: 'none',
                    '--hover-color': strokeColor
                } as React.CSSProperties}
                tabIndex={-1}
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`p-3 rounded-lg bg-gradient-to-r ${color}`}
                    >
                        <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h4 className="skill-title text-xl font-semibold text-white transition-colors duration-300"
                        style={{
                            '--hover-color': strokeColor
                        } as React.CSSProperties}
                    >
                        {title}
                    </h4>
                </div>

                {/* Radar Chart */}
                <div className="h-80 w-full focus:outline-none" style={{ outline: 'none' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                            data={animatedData}
                            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                            style={{ outline: 'none' }}
                        >
                            <PolarGrid
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth={1}
                            />
                            <PolarAngleAxis
                                dataKey="skill"
                                tick={{
                                    fill: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: 12,
                                    fontWeight: 500
                                }}
                                className="text-gray-300"
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 100]}
                                tick={{
                                    fill: 'rgba(255, 255, 255, 0.5)',
                                    fontSize: 10
                                }}
                                tickCount={5}
                            />
                            <Radar
                                name={title}
                                dataKey="value"
                                stroke={strokeColor}
                                fill={fillColor}
                                strokeWidth={2}
                                dot={{
                                    r: 4,
                                    fill: strokeColor,
                                    stroke: strokeColor,
                                    strokeWidth: 2,
                                }}
                                animationBegin={delay * 100}
                                animationDuration={1200}
                                animationEasing="ease-out"
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Skills List */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {data.map((item, index) => (
                        <motion.div
                            key={item.skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: delay * 0.1 + index * 0.05, duration: 0.4 }}
                            className="flex items-center justify-between text-sm"
                        >
                            <span className="text-gray-300">{item.skill}</span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : {}}
                                transition={{ delay: delay * 0.1 + index * 0.05 + 0.3 }}
                                className="font-medium"
                                style={{ color: strokeColor }}
                            >
                                {item.value}%
                            </motion.span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export default CustomRadarChart 