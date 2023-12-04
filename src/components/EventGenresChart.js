import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const colors = ["#1e3d59", "#ff6e40", "#7a2048", "#1e847f", "#ffc13b"];
    useEffect(() => {
        const genres = ["React", "JavasScript", "Node", "jQuery", "Angular"];

        const getData = () => {
            const data = genres.map((genre) => {
                const filteredEvents = events.filter((event) => 
                event.summary.includes(genre)
                );
                return {
                    name: genre,
                    value: filteredEvents.length,
                };
            });
            setData(data);
        };
        getData();
    }, [events]);

    const genres = ["React", "JavasScript", "Node", "jQuery", "Angular"];
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        outerRadius,
        percent,
        index,
    }) => {
        const Radian = Math.PI /100;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * Radian) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * Radian) * 1.07;
        return percent ? (
            <text
            x={x}
            y={y}
            fill="#000000"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };
    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                data={data}
                dataKey="value"
                fill="#ffc13b"
                labelLine={false}
                outerRadius={150}
                label={renderCustomizedLabel}
                >
                    {data.map((_entry, index) => (
                        <Cell key={`cell-S${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenresChart;