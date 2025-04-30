import './PieCharts.css'
import { ResponsiveContainer, PieChart as PieChartComponent, Pie, Cell, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function PieCharts({moodData}) {

    // maps mood numbers to emoji
    const moodsval = {
        "-3": '😭',
        "-2": '😢',
        "-1": '☹️',
        "0": '😐',
        "1": '🙂',
        "2": '😀',
        "3": '😁'
    };
    
    // maps moods to display colors
    const moodColors = {
        "-3": '#8b0000',   // very bad = dark red
        "-2": '#ff4d4d',   // somewhat bad = red
        "-1": '#ff7074',   // neutral = pinkish
        "0": '#ffffC5',    // neutral yellow
        "1": '#d0ffbc',    // good = light green
        "2": '#90ee90',    // great = brighter green
        "3": '#228b22'     // amazing = forest green
    };

    // count how many times each mood occurs
    const moodCounts = {};
    moodData.forEach(entry => {
        const mood = entry.mood;
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    // convert the counts into a format recharts expects
    const pieData = Object.entries(moodCounts).map(([mood, count]) => ({
        name: moodsval[mood],
        value: count,
        color: moodColors[mood]
    }));

    // creates and downloads an excel file with mood data
    const exportToExcel = (moodData) => {
        const worksheet = XLSX.utils.json_to_sheet(moodData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Moods");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        const today = new Date().toISOString().split('T')[0];
        saveAs(file, `MoodData_${today}.xlsx`);
    };

    return (
        <div className='graph-container-pie'>
            <h1>Mood Distribution</h1>
            <div className='pie-container'>
                <div className='legend-container'>
                    {/* mood legend shown next to chart */}
                    {Object.entries(moodsval).map(([mood, emoji]) => (
                        <div key={mood} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <span style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: moodColors[mood],
                                marginRight: '4px',
                                padding: '3px',
                            }}></span>
                            <span style={{ fontSize: '1.4rem', padding: 8, borderRadius: '45%' }}>{emoji}</span>
                        </div>
                    ))}
                </div>
                <div className='pie-chart-container'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChartComponent>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                                label={({ value, x, y }) => (
                                    <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central" fontSize={14}>
                                        {value}
                                    </text>
                                )}
                            >
                                {/* each pie slice with its color */}
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChartComponent>
                    </ResponsiveContainer>
                </div>
            </div>
            <button onClick={() => exportToExcel(moodData)}>
                Export to Excel
            </button>
        </div>
    );
}

export default PieCharts;
