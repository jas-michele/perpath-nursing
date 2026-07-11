import astronaut from "../../assets/space/astro.png";

export default function AstronautNode() {
  return (
    <div className="astronaut-node">
      <img
        src={astronaut}
        className="astronaut-node-image"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}