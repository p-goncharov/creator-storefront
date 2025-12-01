class CreatorApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL || '';
  }

  async getCreators() {
    try {
      const response = await fetch(`${this.baseUrl}/creators`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle different possible response formats
      // If the API returns { creators: [...] } or { data: [...] }
      if (data.creators) return data.creators;
      if (data.data) return data.data;

      // If the API returns an array directly
      if (Array.isArray(data)) return data;

      return [];
    } catch (error) {
      console.error('Error fetching creators:', error);
      throw error;
    }
  }

  async getCreatorById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/creators/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching creator ${id}:`, error);
      throw error;
    }
  }

  async createCreator(creatorData) {
    try {
      const response = await fetch(`${this.baseUrl}/creators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creatorData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating creator:', error);
      throw error;
    }
  }

  async updateCreator(id, creatorData) {
    try {
      const response = await fetch(`${this.baseUrl}/creators/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creatorData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating creator ${id}:`, error);
      throw error;
    }
  }

  async deleteCreator(id) {
    try {
      const response = await fetch(`${this.baseUrl}/creators/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error deleting creator ${id}:`, error);
      throw error;
    }
  }
}

export default CreatorApiService;
