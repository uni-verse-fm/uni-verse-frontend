import { headers } from "./../common/constants";
import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

const resourcePackEndpoint = Endoints.ResourcePacks;

const createResourcePack = (data) =>
  axiosClient.post(`${resourcePackEndpoint}`, data, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });

const getResourcePacks = () =>
  axiosClient.get(resourcePackEndpoint).then((res) => res.data);

const getResourcePackByTitle = (title) =>
  axiosClient.get(`${resourcePackEndpoint}`, { params: { title } });

const getResourcePackById = (id) =>
  axiosClient.get(`${resourcePackEndpoint}/${id}`);

const updateResourcePack = (id, data) =>
  axiosClient.put(`${resourcePackEndpoint}/${id}`, JSON.stringify(data));

const deleteResourcePack = (id) =>
  axiosClient.delete(`${resourcePackEndpoint}/${id}`);

const getUserResourcePack = (id: string) =>
  axiosClient.get(`${resourcePackEndpoint}/user/${id}`);

const downloadResourcePack = (packId: string, destId?: string) =>
  axiosClient.get(
    `${resourcePackEndpoint}/download/${packId}${
      destId ? "?destId=" + destId : ""
    }`,
    { responseType: "blob" }
  );

const downloadResource = (
  packId: string,
  resourceId: string,
  destId?: string
) =>
  axiosClient.get(
    `${resourcePackEndpoint}/download/${packId}?resource=${resourceId}${
      destId ? "?destId=" + destId : ""
    }`,
    { responseType: "blob" }
  );

const searchRecourcesPack = (text: string, { signal }) =>
  axiosClient
    .get(`${resourcePackEndpoint}/search?search=${text}`, {
      signal,
    })
    .then((res) => res.data);

export {
  createResourcePack,
  getResourcePacks,
  getResourcePackByTitle,
  getResourcePackById,
  getUserResourcePack,
  updateResourcePack,
  deleteResourcePack,
  searchRecourcesPack,
  downloadResourcePack,
  downloadResource,
};
