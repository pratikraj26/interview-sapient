import React, { useEffect, useRef, useState } from "react";
import './styles.scss'

export default function Filter(props) {
	const { filterItems, selectedFilters, multiple, onChange } = props;
	const [filterItemList, setFilterItemList] = useState([]);

	useEffect(() => {
		setFilterItemList(
			filterItems.map((item) => ({
				...item,
				isSelected: (selectedFilters || []).find(selectedItem => item.value === selectedItem.value) ? true : false,
			}))
		);
	}, []);

	useEffect(() => {
		onChange &&
			onChange(
				filterItemList
					.filter((item) => item.isSelected)
					.map((item) => ({
						label: item.label,
						value: item.value,
					}))
			);
	}, [filterItemList]);

	const toggleSelect = (e, filterItem) => {
		setFilterItemList(
			filterItemList.map((item) =>
				item.value === filterItem.value
					? {
							...item,
							isSelected: !item.isSelected,
					  }
					: multiple
					? item
					: {
							...item,
						isSelected: false
					  }
			)
		);
	}
	
	return (
		<div className="filter-list">
			{filterItemList.map((filterItem, index) => (
				<span
					key={`filter-item-${filterItem.value}`}
					className={`filter-item ${
						filterItem.isSelected ? "active" : ""
					}`}
					onClick={(e) => toggleSelect(e, filterItem)}
				>
					{filterItem.label}
				</span>
			))}
		</div>
	);
}
