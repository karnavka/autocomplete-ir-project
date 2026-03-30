import { Clust } from "./Clust";
import "./CLusterResults.css"
type Cluster = {
  clusterId: number;
  documents: string[];
};

type Props = {
  clusters: Cluster[];
};

export function ClusterResults({ clusters }: Props) {
  if (!clusters || clusters.length === 0) return null;

  return (
    <div className="clust-results">
      {clusters.map((cluster) => (
        <div key={cluster.clusterId} className="cluster-box">
          <Clust cluster={cluster}/>
        </div>
      ))}
    </div>
  );
}