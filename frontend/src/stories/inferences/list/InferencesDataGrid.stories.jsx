import { withRouter } from "storybook-addon-react-router-v6";
import { InferencesDataGrid } from "../../../pages/inference/list/InferencesDataGrid";

export default {
  title: "Inference/list/InferencesDataGrid",
  component: InferencesDataGrid,
  decorators: [withRouter],
};

export const Empty = {
  args: {
    inferences: [],
    setInferenceIdToDelete: () => {},
    setDeleteDialogOpen: () => {},
  },
};

export const OneElement = {
  args: {
    inferences: [
      {
        id: 19,
        user_name: "manager@unida.com",
        date: "2024-02-26T19:23:12.889423Z",
        updated_on: "2024-02-26T19:23:12.950279Z",
        lot_name: "new lot",
        status: "Running",
        model: "Tree_counting",
        task_id: "123456",
        coords: {
          lat: -22.48814759482108,
          lon: -59.92785324473754,
        },
      },
      {
        id: 20,
        user_name: "manager@unida.com",
        date: "2024-02-26T19:23:12.889423Z",
        updated_on: "2024-02-26T19:23:12.950279Z",
        lot_name: "new lot",
        status: "Completed",
        model: "Tree_counting",
        task_id: "123456",
        coords: null,
      },
    ],
    setInferenceIdToDelete: () => {},
    setDeleteDialogOpen: () => {},
  },
};

const x = {
  count: 12,
  next: null,
  previous: null,
  results: [
    {
      id: 19,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T19:23:12.889423Z",
      updated_on: "2024-02-26T19:23:12.950279Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/IMG_220906_190508_0321_RGB_ZsNBrrO.JPG",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/IMG_220906_190508_0321_RGB_ZsNBrrO/f576d0bc769843d9161e518b36388f33.JPG",
      status: "running",
      model: "tree_counting",
      task_id: "123456",
      latitude: -22.48814759482108,
      longitude: -59.92785324473754,
    },
    {
      id: 18,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T19:21:11.392507Z",
      updated_on: "2024-02-26T19:21:11.406164Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/IMG_220906_190508_0321_RGB_KVQoTAG.JPG",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/IMG_220906_190508_0321_RGB_KVQoTAG/6b7918f6a5f752f32d9485a26e7ff39d.JPG",
      status: "running",
      model: "tree_counting",
      task_id: "123456",
      latitude: -22.48814759482108,
      longitude: -59.92785324473754,
    },
    {
      id: 17,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T19:18:37.538870Z",
      updated_on: "2024-02-26T19:18:37.553672Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/IMG_220906_190508_0321_RGB_LRKcpO1.JPG",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/IMG_220906_190508_0321_RGB_LRKcpO1/320d13b7944223fcabee71a92c85b99a.JPG",
      status: "running",
      model: "tree_counting",
      task_id: "123456",
      latitude: -22.48814759482108,
      longitude: -59.92785324473754,
    },
    {
      id: 16,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T19:14:29.303623Z",
      updated_on: "2024-02-26T19:14:29.316503Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/IMG_220906_190508_0321_RGB_DiCFzhW.JPG",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/IMG_220906_190508_0321_RGB_DiCFzhW/2aff36cffbb8ee5d02c073d53fff755c.JPG",
      status: "running",
      model: "tree_counting",
      task_id: "123456",
      latitude: -22.48814759482108,
      longitude: -59.92785324473754,
    },
    {
      id: 15,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T18:57:25.002789Z",
      updated_on: "2024-02-26T18:57:25.011629Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/IMG_220906_190508_0321_RGB_zMR0wKS.JPG",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/IMG_220906_190508_0321_RGB_zMR0wKS/a784b9aef70e80014bd895e240cf152e.JPG",
      status: "running",
      model: "tree_counting",
      task_id: "123456",
      latitude: -22.48814759482108,
      longitude: -59.92785324473754,
    },
    {
      id: 14,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T18:32:30.668095Z",
      updated_on: "2024-02-26T18:32:30.717236Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/IMG_220906_190508_0321_RGB.JPG",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/IMG_220906_190508_0321_RGB/d816dccb88a19cd233b2c7151cea4d96.JPG",
      status: "running",
      model: "tree_counting",
      task_id: "123456",
      latitude: -22.48814759482108,
      longitude: -59.92785324473754,
    },
    {
      id: 13,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T17:47:52.145268Z",
      updated_on: "2024-02-26T17:48:01.776866Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/IMG_220906_190506_0320_RGB_L4dTy6D.JPG",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/IMG_220906_190506_0320_RGB_L4dTy6D/7e06676d7bf1d3c8013349e369ae4074.JPG",
      status: "running",
      model: "tree_counting",
      task_id: "123456",
      latitude: null,
      longitude: null,
    },
    {
      id: 12,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T17:43:22.227890Z",
      updated_on: "2024-02-26T17:43:22.281249Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/IMG_220906_190511_0322_RGB_wl88QNS.JPG",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/IMG_220906_190511_0322_RGB_wl88QNS/1dcccaf009a72eed2ae8c29349ba4d9d.JPG",
      status: "running",
      model: "tree_counting",
      task_id: "123456",
      latitude: -22.488138959066106,
      longitude: -59.92811783713568,
    },
    {
      id: 11,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T15:03:52.309156Z",
      updated_on: "2024-02-26T15:03:52.926408Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/20230821_150808_09RDobL.jpg",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/20230821_150808_09RDobL/5fe0f6544de86e0ae189ef4409767fa6.jpg",
      status: "completed",
      model: "leaves",
      task_id: "123456",
      latitude: null,
      longitude: null,
    },
    {
      id: 10,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T13:15:34.558557Z",
      updated_on: "2024-02-26T13:15:35.235148Z",
      lot: 2,
      lot_name: "new lot",
      image:
        "http://localhost:8000/media/inference_jobs/20230821_150808_vIDsiCZ.jpg",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/20230821_150808_vIDsiCZ/f058294861de6b0cf70e9802c5bbfbd2.jpg",
      status: "completed",
      model: "leaves",
      task_id: "123456",
      latitude: null,
      longitude: null,
    },
    {
      id: 9,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-26T13:05:11.073435Z",
      updated_on: "2024-02-26T13:05:11.641084Z",
      lot: 1,
      lot_name: "asdfdsf",
      image:
        "http://localhost:8000/media/inference_jobs/bc0b549a-20230720_095537_cnLjkrt.jpg",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/bc0b549a-20230720_095537_cnLjkrt/07b9829e94df3b13397dc327a41175c3.jpg",
      status: "completed",
      model: "fruits",
      task_id: "123456",
      latitude: null,
      longitude: null,
    },
    {
      id: 8,
      user: {
        id: 2,
        email: "manager@unida.com",
        first_name: "Morgan",
        last_name: "Freeman",
        is_company_manager: true,
      },
      created_on: "2024-02-25T00:06:17.150938Z",
      updated_on: "2024-02-25T00:06:17.786716Z",
      lot: 1,
      lot_name: "asdfdsf",
      image:
        "http://localhost:8000/media/inference_jobs/20230821_150808_Azk2ZUQ.jpg",
      image_thumbnail:
        "http://localhost:8000/media/CACHE/images/inference_jobs/20230821_150808_Azk2ZUQ/9a1e962632903dd49e3790f74d1bccd4.jpg",
      status: "completed",
      model: "leaves",
      task_id: "123456",
      latitude: null,
      longitude: null,
    },
  ],
};
