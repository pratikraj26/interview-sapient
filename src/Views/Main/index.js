import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchLaunchPrograms } from "~/redux/actions/launchPrograms";

import "./styles.scss";

export default function Main() {
	const launchYearFilters = []
	for (let year = 2006; year <= 2020 ; year++) {
		launchYearFilters.push(year);
	}
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

	console.log(selectedFilters)

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
		console.log(params);
		if (params.length > 0) {
			history.push(`/?${params.join("&")}`);
		}
	}, [selectedFilters]);
	
	return (
		<div className="main">
			<div className="page-header">
				<h1>SpaceX Launch Programs</h1>
			</div>
			<div className="content">
				<div className="filters-container card">
					<h3>Filters</h3>
					<div className="filter-title">Launch Year</div>
					<div className="filter-list">
						{launchYearFilters.map((year, index) => (
							<div
								key={`filter-launch-year-${index}`}
								className={`filter-item ${
									selectedFilters.launchYear === year
										? "active"
										: ""
								}`}
								onClick={(e) =>
									setSelectedFilters({
										...selectedFilters,
										launchYear:
											selectedFilters.launchYear === year
												? ""
												: year,
									})
								}
							>
								{year}
							</div>
						))}
					</div>

					<div className="filter-title">Successful Launch</div>
					<div className="filter-list">
						<div
							className={`filter-item ${
								selectedFilters.successfulLaunch === "true"
									? "active"
									: ""
							}`}
							onClick={(e) =>
								setSelectedFilters({
									...selectedFilters,
									successfulLaunch:
										selectedFilters.successfulLaunch ===
										"true"
											? ""
											: "true",
								})
							}
						>
							True
						</div>
						<div
							className={`filter-item ${
								selectedFilters.successfulLaunch === "false"
									? "active"
									: ""
							}`}
							onClick={(e) =>
								setSelectedFilters({
									...selectedFilters,
									successfulLaunch:
										selectedFilters.successfulLaunch ===
										"false"
											? ""
											: "false",
								})
							}
						>
							False
						</div>
					</div>

					<div className="filter-title">Successful Landing</div>
					<div className="filter-list">
						<div
							className={`filter-item ${
								selectedFilters.successfulLand === "true"
									? "active"
									: ""
							}`}
							onClick={(e) =>
								setSelectedFilters({
									...selectedFilters,
									successfulLand:
										selectedFilters.successfulLand === "true"
											? ""
											: "true",
								})
							}
						>
							True
						</div>
						<div
							className={`filter-item ${
								selectedFilters.successfulLand === "false"
									? "active"
									: ""
							}`}
							onClick={(e) =>
								setSelectedFilters({
									...selectedFilters,
									successfulLand:
										selectedFilters.successfulLand === "false"
											? ""
											: "false",
								})
							}
						>
							False
						</div>
					</div>
				</div>
				{!launchPrograms.fetched ? (
					<div className="loader-container">
						<div className="primary loader"></div>
					</div>
				) : (
					<div className="launch-program-list-container">
						{launchPrograms.launchPrograms.length === 0 ? (
							<div className="no-data">
								No Launch Programs Found
							</div>
						) : (
							launchPrograms.launchPrograms.map(
								(launchProgramItem, index) => (
									<div
										className="launch-program-list-item"
										key={`launch-program-list-item-${index}`}
									>
										<div className="program-image">
											<img
												src={
													launchProgramItem.links
														.mission_patch
												}
												alt={
													launchProgramItem.mission_name
												}
											/>
										</div>
										<div className="program-content">
											<div className="program-title">
												{launchProgramItem.mission_name}{" "}
												#
												{
													launchProgramItem.flight_number
												}
											</div>
											<div className="program-data">
												<div className="content-title">
													Mission Ids
												</div>
												<ul className="content-data-list">
													{launchProgramItem.mission_id.map(
														(id, idx) => (
															<li
																className="content-value"
																key={`miison-id-${index}-${idx}`}
															>
																{id}
															</li>
														)
													)}
												</ul>
											</div>
											<div className="program-data">
												<div className="content-title">
													Launch Year:
												</div>
												<div className="content-value">
													{
														launchProgramItem.launch_year
													}
												</div>
											</div>
											<div className="program-data">
												<div className="content-title">
													Successful Launch:
												</div>
												<div className="content-value">
													{launchProgramItem.launch_success.toString()}
												</div>
											</div>
											<div className="program-data">
												<div className="content-title">
													Successful Land:
												</div>
												<div className="content-value">
													{launchProgramItem.launch_landing || "false"}
												</div>
											</div>
										</div>
									</div>
								)
							)
						)}
					</div>
				)}
			</div>
			<div className="footer">
				<span className="strong">Developed By: </span> Pratik Raj
			</div>
		</div>
	);
}
