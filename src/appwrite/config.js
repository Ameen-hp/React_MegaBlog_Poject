import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Account, Query, Permission, Role } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    bucketId;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.bucketId = conf.appwriteBucketId; // store bucketId here
        this.account = new Account(this.client);
    }

    // Sanitize slugs for document IDs
    sanitizeSlug(slug) {
        if (!slug) return ID.unique();
        return slug
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d-]/g, "-")
            .replace(/-+/g, "-")
            .slice(0, 36);
    }

    // POSTS
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const safeSlug = this.sanitizeSlug(slug);
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                safeSlug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const safeSlug = this.sanitizeSlug(slug);
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                safeSlug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            const safeSlug = this.sanitizeSlug(slug);
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                safeSlug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const safeSlug = this.sanitizeSlug(slug);
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                safeSlug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // FILES
    getFileUrl(fileId) {
        return this.bucket.getFileView(this.bucketId, fileId);
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(this.bucketId, fileId);
    }

    async uploadFile(file) {
        try {
            // Ensure session exists
            try {
                await this.account.get();
            } catch {
                await this.account.createAnonymousSession();
            }

            const uploadedFile = await this.bucket.createFile(
                this.bucketId,
                ID.unique(),
                file,
                [Permission.read(Role.any())] // public read
            );

            return uploadedFile; // returns object with $id
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(this.bucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }
}

const service = new Service();
export default service;
