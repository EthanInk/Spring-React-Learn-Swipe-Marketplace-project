import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import CardGrid from "../common/individual/CardGrid";
import { useEffect, useState } from "react";
import { usePost } from "../../context/PostContext";
import UserDetailsEdit from "../common/individual/UserDetailsEdit";

function LikedPosts() {
  const postContext = usePost();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsForUser();
  }, []);

  function getPostsForUser() {
    postContext
      .getOwnAds()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const data = [
    {
      label: "Your Posts",
      value: "Your-Posts",
      desc: (
        <div className="p-4">
          <Typography variant="h1">Your Posts</Typography>
          {posts.length === 0 ? (
            "No disliked posts"
          ) : (
            <CardGrid posts={posts}></CardGrid>
          )}
        </div>
      ),
    },
    {
      label: "Details",
      value: "details",
      desc: (<UserDetailsEdit></UserDetailsEdit>),
    },
  ];
  return (
    <Tabs value="html">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export default LikedPosts;
