import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "~/Modules/Header";
import Filter from "~/Modules/Filter";
import ProgramList from "~/Modules/ProgramList";
import Footer from "~/Modules/Footer";
import { fetchLaunchPrograms } from "~/redux/actions/launchPrograms";

import "./styles.scss";

export default function Main() {
	const launchYearFilters = []
	for (let year = 2006; year <= 2020 ; year++) {
		launchYearFilters.push({
			label: year,
			value: year
		});
	}
	const successfulLaunchFilters = [{
		label: "True",
		value: "true"
	},{
		label: "False",
		value: "false"
		}]
	
	const successfulLandFilters = [{
		label: "True",
		value: "true"
	},{
		label: "False",
		value: "false"
	}]
	const history = useHistory()
	const dispatch = useDispatch()
	const launchPrograms = useSelector((state) => state.launchPrograms);
	
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const launch_year = params.get("launch_year");
	const launch_success = params.get("launch_success");
	const landing_success = params.get("landing_success");
	
	const [selectedFilters, setSelectedFilters] = useState({
		launchYear: parseInt(launch_year),
		successfulLaunch: launch_success,
		successfulLand: landing_success,
	});

	useEffect(() => {
		dispatch(
			fetchLaunchPrograms({
				limit: 40,
				launch_year: launch_year,
				launch_success: launch_success,
				landing_success: landing_success,
			})
		);
	}, [launch_year, launch_success, landing_success, dispatch]);

	useEffect(() => {
		const params = []
		if (selectedFilters.launchYear) {
			params.push(`launch_year=${selectedFilters.launchYear}`);
		}
		if (selectedFilters.successfulLaunch) {
			params.push(`launch_success=${selectedFilters.successfulLaunch}`);
		}
		if (selectedFilters.successfulLand) {
			params.push(`landing_success=${selectedFilters.successfulLand}`);
		}
		if (params.length > 0) {
			history.push(`/?${params.join("&")}`);
		} else {
			history.push(`/`);

		}
	}, [selectedFilters]);
	
	return (
		<main className="main">
			<Header />
			<div className="content">
				<div className="filters-container card">
					<h3>Filters</h3>
					<div className="filter-title">Launch Year</div>
					<Filter
						filterItems={launchYearFilters}
						selectedFilters={launchYearFilters.filter(
							(item) => item.value === selectedFilters.launchYear
						)}
						onChange={(selectedItem) =>
							setSelectedFilters({
								...selectedFilters,
								launchYear: selectedItem[0]
									? selectedItem[0].value
									: null,
							})
						}
					/>

					<div className="filter-title">Successful Launch</div>
					<Filter
						filterItems={successfulLaunchFilters}
						selectedFilters={successfulLaunchFilters.filter(
							(item) =>
								item.value === selectedFilters.successfulLaunch
						)}
						onChange={(selectedItem) =>
							setSelectedFilters({
								...selectedFilters,
								successfulLaunch: selectedItem[0]
									? selectedItem[0].value
									: null,
							})
						}
					/>

					<div className="filter-title">Successful Landing</div>
					<Filter
						filterItems={successfulLandFilters}
						selectedFilters={successfulLandFilters.filter(
							(item) =>
								item.value === selectedFilters.successfulLand
						)}
						onChange={(selectedItem) =>
							setSelectedFilters({
								...selectedFilters,
								successfulLand: selectedItem[0]
									? selectedItem[0].value
									: null,
							})
						}
					/>
				</div>
				<ProgramList
					isLoading={!launchPrograms.fetched}
					items={launchPrograms.launchPrograms}
				/>
			</div>
			<Footer />
		</main>
	);
}
