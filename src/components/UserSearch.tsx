import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce, Trie } from '../utils/debounce';
import type { User } from '../types';
import { Search } from 'lucide-react';

const UserSearch: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const trie = useMemo(() => new Trie(), []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        
        // Build Trie with user names
        data.forEach((user: User) => {
          trie.insert(user.name);
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [trie]);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (!term.trim()) {
        setFilteredUsers(users);
        return;
      }

      const results = users.filter(user =>
        trie.startsWith(term.toLowerCase()) && 
        user.name.toLowerCase().includes(term.toLowerCase())
      );
      
      setFilteredUsers(results);
    }, 300),
    [users, trie]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <section className="py-20 bg-gray-50" id="team">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(searchTerm ? filteredUsers : users).map((user) => (
              <div
                key={user.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-gray-600 mb-2">{user.phone}</p>
                <p className="text-gray-600 mb-2">{user.website}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-medium">{user.company.name}</p>
                  <p className="text-gray-500 italic">{user.company.catchPhrase}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserSearch;