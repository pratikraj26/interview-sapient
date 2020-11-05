import React from "react";
import Card from '~/Modules/Card'
import "./styles.scss";

export default function ProgramList(props) {
	const { isLoading, items } = props;
	if (isLoading) {
		return (
			<div className="loader-container">
				<div className="primary loader"></div>
			</div>
		);
	}
	return (
		<div className="launch-program-list-container">
			{items.length === 0 ? (
				<div className="no-data">No Launch Programs Found</div>
			) : (
				items.map((item, index) => (
					<Card
						key={`card-item-${index}`}
						image={item.links.mission_patch}
						title={`${item.mission_name} #${item.flight_number}`}
						missionIds={item.mission_id}
						metadata={[
							{
								label: "Launch Year",
								value: item.launch_year,
							},
							{
								label: "Successful Launch",
								value: item.launch_success.toString(),
							},
							{
								label: "Successfule Land",
								value: item.launch_landing
									? item.launch_landing.toString()
									: "false",
							},
						]}
					/>
				))
			)}
		</div>
	);
}
