require("dotenv").config()

const Profile = require("../models/profile-model")
const _ = require("lodash")
const { getCoByGeoApify } = require("../../utils/Address/getLatLon")
const profileCltr = {}
const cloudinary = require("../../utils/Cloudinary/cloudinary")
const User = require("../models/user-model")


profileCltr.getOne = async (req, res) => {

    try {
        const profile = await Profile.findOne({ userId: req.user.id }).populate("userId")
            .populate({
                path: 'orders.ordersId',
                populate: {
                    path: 'products.productId',
                    model: 'Product',
                    // select: "_id name images"
                }
            })

        if (!profile) {
            //  profile is not found 
            return res.status(404).json({ error: "Profile not found" });
        }
        return res.status(200).json(profile);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

profileCltr.update = async (req, res) => {
    try {
        const body = _.pick(req.body, ["gender", "username", "email", "phoneNumber"]);

        console.log(req.file, "file")

        const updatedProfile = {};
        const updateUser = {};

        if (body.gender) {
            updatedProfile.gender = body.gender;
        }

        if (req?.file) {
            console.log(req.file, "file")
            const uploaded = await cloudinary.uploader.upload(req.file.path);
            updatedProfile.profilePic = uploaded.secure_url;
        }

        if (body.username) {
            updateUser.username = body.username;
        }
        if (body.phoneNumber) {
            updateUser.phoneNumber = body.phoneNumber;
        }
        if (body.email) {
            updateUser.email = body.email;
        }

        if (Object.keys(updatedProfile).length === 0 && Object.keys(updateUser).length === 0) {
            return res.status(400).json({ msg: "Nothing to update" });
        }

        if (Object.keys(updateUser).length > 0) {
            await User.findByIdAndUpdate(req.user.id, updateUser, { new: true });
        }

        if (Object.keys(updatedProfile).length > 0) {
            const profile = await Profile.findOneAndUpdate(
                { userId: req.user.id },
                updatedProfile,
                { new: true }
            ).populate("userId");

            return res.status(201).json({
                msg: "Profile Updated Successfully",
                data: profile
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};


profileCltr.addAddress = async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        if (profile.addresses.length >= 3) {
            return res.status(400).json({ error: "Address limit exceeded" });
        }


        // Retrieve the address object with coordinates
        const addressData = await getCoByGeoApify(req.body.address);

        // Push the addressData into the addresses array
        profile.addresses.push(addressData);

        // Save the updated profile
        const updatedProfile = await profile.save();

        return res.json({ data: updatedProfile });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

profileCltr.updateAddress = async (req, res) => {
    const { addressId } = req.params
    try {
        const profile = await Profile.findOne({ userId: req.user.id });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        const addressIndex = profile.addresses.findIndex(address => address._id.toString() === addressId)
        if (addressIndex === -1) return res.json({
            msg: "Address Not found"
        })

        const addressData = await getCoByGeoApify(req.body.address);

        profile.addresses[addressIndex] = { ...profile.addresses[addressIndex]._doc, ...addressData }

        await profile.save()

        return res.json({ data: profile, msg: "Updated Successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}







module.exports = profileCltr