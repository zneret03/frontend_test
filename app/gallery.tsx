"use client";

import { useState, useMemo } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import SelectDialog from "./components/Select/SelectDialog";
import Modal from "./modal";
import { SortField, SortDirection } from "@/lib/type/sort";
import { User } from "@/lib/type/user";

export type GalleryProps = {
  users: User[];
};

const AVATAR_COLORS = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"];

const Gallery = ({ users }: GalleryProps) => {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let aValue: string = "";
      let bValue: string = "";

      if (sortField === "company") {
        aValue = a.company.name.toLowerCase();
        bValue = b.company.name.toLowerCase();
      } else {
        aValue = (a[sortField] as string).toLowerCase();
        bValue = (b[sortField] as string).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortField, sortDirection]);

  const handleModalOpen = (id: number) => {
    const user = users.find((item) => item.id === id);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <SelectDialog
          onSortFieldChange={setSortField}
          onSortDirectionChange={setSortDirection}
        />
      </div>

      <div className="items">
        {sortedUsers.map((user) => (
          <div
            className="item user-card"
            key={user.id}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={AVATAR_COLORS}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}

        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
                onKeyDown={(e) => e.key === "Enter" && handleModalClose()}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={AVATAR_COLORS}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">
                      {`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}
                    </div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="field">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
