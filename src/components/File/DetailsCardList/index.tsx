import React from "react";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import FileDetailsCard from "../DetailsCard";
import { APIFileDetails } from "../../../api/files/types";

const ItemType = "CARD";

interface FileDetailsCardListProps {
	files: APIFileDetails[];
}

interface DragItem {
	index: number;
	id: string;
	type: string;
}

const FileDetailsCardList: React.FC<FileDetailsCardListProps> = ({ files }) => {
	const [cards, setCards] = React.useState<APIFileDetails[]>(files || []);

	const moveCard = (dragIndex: number, hoverIndex: number) => {
		const draggedCard = cards[dragIndex];
		setCards(
			update(cards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, draggedCard],
				],
			})
		);
	};

	const renderCard = (card: APIFileDetails, index: number) => (
		<DraggableCard
			key={card._id}
			index={index}
			id={card._id}
			moveCard={moveCard}
			name={card.filename}
			views={card.views}
		/>
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{cards.map((card, index) => renderCard(card, index))}
		</div>
	);
};

interface DraggableCardProps {
	id: number | string;
	index: number;
	name: string;
	views: number | string;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
	id,
	index,
	name,
	views,
	moveCard,
}) => {
	const ref = React.useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: ItemType,
		hover(item: DragItem, monitor) {
			if (!ref.current) return;
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

			moveCard(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemType,
		item: { type: ItemType, id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<div
			ref={ref}
			style={{
				opacity: isDragging ? 0.5 : 1,
				padding: "10px",
				margin: "5px 0",
			}}
		>
			<FileDetailsCard
				uploadDate="2021-08-15"
				views={views || "0"}
				fileName={name} // Using the name prop here
				thumbnailUrl="" // Ensure to provide actual URL if available
				tags={["React", "TypeScript"]}
			/>
		</div>
	);
};

export default FileDetailsCardList;
