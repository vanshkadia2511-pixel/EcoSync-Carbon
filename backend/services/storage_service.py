import time
from typing import List, Dict, Any
from config import settings

# In-memory storage for demo mode
_records_store: List[Dict[str, Any]] = []
_challenges_store: Dict[str, Dict[str, Any]] = {}

class StorageService:
    def __init__(self):
        self.use_firestore = settings.USE_FIRESTORE
        self.db = None
        if self.use_firestore:
            try:
                from google.cloud import firestore
                self.db = firestore.Client(project=settings.PROJECT_ID)
            except Exception as e:
                print(f"Warning: Failed to initialize Firestore: {e}. Falling back to in-memory.")
                self.use_firestore = False

    def save_audit(self, record: Dict[str, Any]) -> None:
        if self.use_firestore and self.db:
            try:
                self.db.collection("audits").document(record["recordId"]).set(record)
                return
            except Exception as e:
                print(f"Firestore save_audit error: {e}. Falling back to in-memory.")
        _records_store.append(record)

    def get_history(self, session_id: str) -> List[Dict[str, Any]]:
        if self.use_firestore and self.db:
            try:
                docs = self.db.collection("audits").where("sessionId", "==", session_id).order_by("createdAt", direction="DESCENDING").stream()
                return [doc.to_dict() for doc in docs]
            except Exception as e:
                print(f"Firestore get_history error: {e}. Falling back to in-memory.")
        
        # In-memory filter & sort
        user_records = [r for r in _records_store if r["sessionId"] == session_id]
        user_records.sort(key=lambda x: x["createdAt"], reverse=True)
        return user_records

    def save_challenge(self, challenge: Dict[str, Any]) -> None:
        if self.use_firestore and self.db:
            try:
                self.db.collection("challenges").document(challenge["challengeId"]).set(challenge)
                return
            except Exception as e:
                print(f"Firestore save_challenge error: {e}. Falling back to in-memory.")
        _challenges_store[challenge["challengeId"]] = challenge

    def update_challenge(self, challenge_id: str, completed: bool) -> Dict[str, Any]:
        if self.use_firestore and self.db:
            try:
                doc_ref = self.db.collection("challenges").document(challenge_id)
                doc_ref.update({"completed": completed})
                doc = doc_ref.get()
                if doc.exists:
                    return doc.to_dict()
            except Exception as e:
                print(f"Firestore update_challenge error: {e}. Falling back to in-memory.")
        
        if challenge_id in _challenges_store:
            _challenges_store[challenge_id]["completed"] = completed
            return _challenges_store[challenge_id]
        return {"challengeId": challenge_id, "completed": completed}

storage_service = StorageService()
