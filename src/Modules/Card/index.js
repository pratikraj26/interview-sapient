import React from "react";
import "./styles.scss";

export default function Card(props) {
	const { title, image, missionIds, metadata } = props
	return (
		<div className="card-item">
			<div className="card-image">
				<img src={image} alt={title} />
			</div>
			<div className="card-content">
				<span className="card-title">{title}</span>
				<div className="card-data">
					<span className="content-title">Mission Ids</span>
					<ul className="content-data-list">
						{missionIds.map((id, idx) => (
							<li
								className="content-value"
								key={`mission-id-${idx}`}
							>
								{id}
							</li>
						))}
					</ul>
				</div>
				{metadata.map((metadataItem, metadataIndex) => (
					<div className="card-data">
						<span className="content-title">
							{metadataItem.label}:
						</span>
						<span className="content-value">
							{metadataItem.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
