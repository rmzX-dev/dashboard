import { useEffect, useState } from "react";
import { useToast } from "../components/ui/ToastContainer";

export function useResource(api) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const load = async () => {
    try {
      setLoading(true);
      const data = await api.getAll();
      setItems(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error al cargar los datos";
      showToast("error", errorMessage);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const create = async (body) => {
    try {
      await api.create(body);
      await load();
      showToast("success", "Usuario registrado exitosamente");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error al registrar el usuario";
      showToast("error", errorMessage);
      throw error;
    }
  };

  const update = async (id, body) => {
    try {
      await api.update(id, body);
      await load();
      showToast("success", "Usuario actualizado exitosamente");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error al actualizar el usuario";
      showToast("error", errorMessage);
      throw error;
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(id);
      await load();
      showToast("success", "Usuario eliminado exitosamente");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error al eliminar el usuario";
      showToast("error", errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { items, loading, create, update, remove };
}
