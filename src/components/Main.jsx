import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import { Route, Routes, Navigate, Outlet } from "react-router-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppBar from "./AppBar";
import MyReviews from "./MyReviews";
import theme from "../theme";
import SingleRepositoryView from "./SingleRepositoryView";
import ReviewForm from "./ReviewForm";
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Outlet />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/repositories/:id" element={<SingleRepositoryView />} />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
