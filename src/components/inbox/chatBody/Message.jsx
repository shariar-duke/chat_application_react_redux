/* eslint-disable react/prop-types */
export default function Message({ justify, message }) {
    return (
        <li className={`flex ${justify === "end" ? "justify-end" : "justify-start"}`}>
            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span className="block">{message}</span>
            </div>
        </li>
    );
}
