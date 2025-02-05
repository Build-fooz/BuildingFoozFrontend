import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
const salesByCategory = [
	{ id: "Whole Spices", name: "Whole Spices" ,value: 4500},
	{ id: "aromatic spices", name: "Aromatic Spices",value: 4500 },
	{ id: "herbs and leafy spices", name: "Herbs and Leafy Spices",value: 4500 },
	{ id: "sweet spices", name: "Sweet Spices",value: 4500 },
	{ id: "seeds", name: "Seeds" ,value: 4500},
	{ id: "exotic/regional spices", name: "Exotic/Regional Spices",value: 4500 },
	{ id: "ground spices", name: "Ground Spices",value: 4500 },
];//Sample data

const COLORS = [ 
	"rgba(40, 20, 100, 0.4)",
	"rgba(35, 18, 90, 0.3)",
	"rgba(30, 15, 80, 0.4)",
	"rgba(25, 12, 70, 0.5)",
	"rgba(20, 10, 60, 0.6)",
	"rgba(15, 8, 50, 0.7)",
	"rgba(10, 5, 40, 0.8)"
  ];
;

const SalesByCategoryChart = () => {
	return (
		<motion.div
			className='bg-[#f7d6d0] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-black-100 mb-4'>Sales by Category</h2>

			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={salesByCategory}
							cx='50%'
							cy='50%'
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{salesByCategory.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesByCategoryChart;