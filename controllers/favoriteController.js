import User from "../models/userModel.js";

export const addFavoriteMovie = async (req, res) => {
  try {
    const { userId, movie } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const movieExists = user.favorites.some(
      (favMovie) => favMovie.imdbID === movie.imdbID
    );

    if (!movieExists) {
      user.favorites.push(movie);
      await user.save();
      res.status(200).json({ message: "Movie added to favorites", favorites: user.favorites });
    } else {
      res.status(400).json({ message: "Movie already exists in favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getFavoriteMovies = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteFavoriteMovie = async (req, res) => {
  try {
    const { userId, imdbID } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorites = user.favorites.filter((movie) => movie.imdbID !== imdbID);
    await user.save();
    res.status(200).json({ message: "Movie removed from favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};