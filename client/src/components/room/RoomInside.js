import RoomLeftSide from './RoomLeftSide';
import RoomRightSide from './RoomRightSide';

export default function RoomInside() {
    return (
        <div className="container" id="full-room">
            <div className="container-fluid d-flex" id="room-all-side">
                <RoomLeftSide />
                <RoomRightSide />
            </div>
        </div>
    );
}
